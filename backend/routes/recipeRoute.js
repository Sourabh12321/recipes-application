const express = require("express");
const axios = require("axios");
require("dotenv").config();

const recipeRouter = express.Router();

recipeRouter.get("/data/:id", async (req, res) => {
    try {
        let offset = req.params.id;

        axios
            .get(`https://api.spoonacular.com/recipes/complexSearch?offset=${offset ? offset : 0}&apiKey=${process.env.APIKEY}`)
            .then((response) => {
                res.status(200).json({ msg: response.data });
            })
            .catch((err) => {
                console.log(err.message);
                res.status(404).json({ msg: "data not found" });
            });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }

});




module.exports = {
    recipeRouter
}