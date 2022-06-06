import "../css/main.scss"

// GET USER NAME
var url = new URL(document.URL);
const params = url.searchParams;

$('#username-label').text(params.get('user'));

$(function() {
    if (checkCookie('google-user-jwt')) {
        let googleToken = getCookie('google-user-jwt');

        const Http = new XMLHttpRequest();
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token='+googleToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(Http.responseText);
                let pictureURL = response['picture'];
                let pictureDiv = document.getElementById('user-photo');
                let pictureObj = document.createElement('img');
                pictureObj.src = pictureURL;
                pictureObj.alt = 'user-picture';
                pictureDiv.appendChild(pictureObj);
            }
        }
    }
});