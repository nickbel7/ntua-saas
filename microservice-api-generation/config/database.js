const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const { Sequelize, DataTypes } = require("sequelize");

let db = {};

const { PG_URI } = process.env;
const sequelize = new Sequelize(PG_URI, { dialect: 'postgres', dialectOptions: { useUTC: false }, timezone: '+02:00' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = async function() {
    sequelize.authenticate().then(() => {
        console.log("Connection to generation database has been established successfully.");

        //import db models
        const countries = require("../model/countries")(sequelize, DataTypes);
        db[countries.name] = countries;
        const aggregated_generation = require("../model/aggregated_generation")(sequelize, DataTypes);
        db[aggregated_generation.name] = aggregated_generation;
        
        sequelize.sync()
        .then(() => {
            console.log("Generation model synchronised with database.");
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
        console.error("Error connecting to generation database:", err);
    });
}

module.exports = db;