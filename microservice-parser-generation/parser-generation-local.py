import os
import zipfile
import csv
from kafka import KafkaProducer
from kafka import KafkaConsumer
from google.cloud import storage
import configparser

# PARAMETERS
config_path = './config.ini'
configParser = configparser.ConfigParser();
configParser.read(config_path)
kafka_params = configParser["kafka"]

# INITIALIZE A KAFKA PRODUCER
producer = KafkaProducer(bootstrap_servers = kafka_params["servers"])

# INITIALIZE A KAFKA CONSUMER
consumer = KafkaConsumer(kafka_params["consumer_topic"], bootstrap_servers = kafka_params["servers"], auto_offset_reset = 'latest', group_id = kafka_params["consumer_groupid"])

# PATH OF PROJECT
dir_path = os.path.dirname(os.path.realpath(__file__))

# NEW FILES TO BE IMPORTED
def list_dir_files(dirName):
    list_of_files = os.listdir(dirName)
    all_files = list()
    for entry in list_of_files:
        full_path = os.path.join(dirName, entry)
        if os.path.isdir(full_path):
            all_files = all_files + list_dir_files(full_path)
        else:
            all_files.append(full_path)
    return all_files

def parse_file(file_path):
    reader = csv.reader(open(file_path), delimiter='\t')
    filtered = filter(lambda p: 'CTY' == p[3], reader)
    new_path_file = os.path.join(dir_path, "import_files", os.path.basename(file_path))
    csv.writer(open(new_path_file, 'w', newline=''), delimiter='\t').writerows(filtered)
    print ("Parsed " + os.path.basename(file_path))

# Kafka consumer
files_list = sorted(list_dir_files(os.path.join(dir_path, "parse_files")))

for message in consumer:
    # Commit message offset
    consumer.commit()

    # Parse file
    file_path = files_list.pop(0)
    file_name = os.path.basename(file_path)
    print("Parsing " + file_name)
    parse_file(file_path)

    # Compress file
    new_file_path = os.path.join(dir_path, "import_files", file_name)
    file_name_zip = file_name.replace(file_name[len(file_name) - 3:], "zip")
    with zipfile.ZipFile('./import_files/' + file_name_zip, 'w', zipfile.ZIP_DEFLATED) as zip:
        zip.write(new_file_path, file_name) # zip.write(actual file path, path inside zip file)

    # Upload file to bucket
    client = storage.Client.from_service_account_json('./saas-2022-bc1a910f9c03.json')
    bucket = client.get_bucket(kafka_params["bucket_name"], timeout=300.0)
    blob = bucket.blob(file_name_zip)

    for attempt in range(10):
        try:
            print("Uploading " + file_name_zip + " to flows-bucket")
            blob.upload_from_filename('./import_files/' + file_name_zip)
        except:
            print("The write operation timed out. Retrying...")
        else:
            print("Uploaded " + file_name_zip + " to " + kafka_params["bucket_name"])
            # os.remove('./parse_files/' + file_name) 
            os.remove('./import_files/' + file_name) 
            os.remove('./import_files/' + file_name_zip) 
            print("Deleted " + file_name_zip + ", " + file_name)
            break
    else:
        print("The write operation timed out. Retries exceeded.")

    # Send message to kafka for each file parse
    producer.send(kafka_params["producer_topic"], file_name_zip.encode('utf-8'))
    producer.flush()
    print("Message: " + file_name_zip + " sent to topic " + kafka_params["producer_topic"])

    # Check if file list is empty
    if (len(files_list) == 0):
        print("All files parsed")
        break