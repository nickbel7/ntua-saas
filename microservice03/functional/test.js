require("dotenv").config();
const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

app.post("", async(req, res) => {
    try {
        await db.actual_total.create({
            resolution_code: "booga",
            area_code: "ooga"
        });
        await db.countries.create({
            country: "grec",
            map_code: "ooga"
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;