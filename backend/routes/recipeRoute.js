const express = require("express");
const axios = require("axios");
const { recipieUser } = require("../models/UserRecipe");
const { auth } = require("../middlewares/auth");
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

recipeRouter.get("/search", async (req, res) => {
    try {
        let query = req.query.data
        axios
            .get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=6f105b7e59dd4ade90b5dc2630bf09b6`)
            .then((response) => {
                res.status(200).send(response.data);
            })
            .catch((err) => {
                console.log(err.message);
                res.status(404).send({ msg: "data not found" });
            });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

})

recipeRouter.post("/", auth, async (req, res) => {

    try {
        let { id, image, title, userID } = req.body
        console.log(req.body);
        let data = await recipieUser.findOne({ where: { recipi_id: id } });

        if (data) {
            return res
                .status(200)
                .json({ msg: "recipie already saved" });
        }

        let recip = recipieUser.build({
            recipi_id: id,
            image,
            title,
            user_id: userID
        });
        await recip.save();
        return res.status(201).json({"msg":"recipie saved successfully"});
    } catch (error) {

        return res.status(400).json({ error: error.message });
    }


})


recipeRouter.get("/steps/:id", async (req, res) => {
    try {
        let recid = req.params.id

        axios
            .get(`https://api.spoonacular.com/recipes/${recid}/analyzedInstructions?apiKey=6f105b7e59dd4ade90b5dc2630bf09b6`)
            .then((response) => {
                res.status(200).send(response.data);
            })
            .catch((err) => {
                console.log(err.message);
                res.status(404).send({ msg: "data not found" });
            });
    } catch (error) {
        res.status(400).json({ "msg": error.message })

    }
})


recipeRouter.get("/userRecipes", auth, async (req, res) => {
    try {
        let { userID } = req.body
        console.log(userID)
        let data = await recipieUser.findAll({ where: { user_id: userID } })
        console.log(data)
        res.status(200).json({ data })

    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }

})


recipeRouter.delete("/userRecipes/:id", auth, async (req, res) => {
    try {
        let id = req.params.id
        let { userID } = req.body

        let data = await recipieUser.destroy({ where: { user_id: userID, id } })
        console.log(data)
        res.status(200).json({ msg: "data is deleted" })

    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }

})


module.exports = {
    recipeRouter
}