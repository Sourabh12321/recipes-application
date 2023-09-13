const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    // let token=req.headers.authorization
    console.log(token)
    if (!token) {
        return res.status(404).json({ msg: "please login first" });
    }

    jwt.verify(token, process.env.KEY, function (err, decoded) {
        if (err) {
            console.log("lasdaf")
            return res.status(400).send({ msg: "please login again" });
        } else {
            if (typeof decoded === "string") {
                console.log("lasdaf")
                return res.status(500).json({ msg: "Unexpected token format" });
            }
            // console.log(decoded);

            req.body.userID = decoded.userId
            next();
        }
    });
}



module.exports = { auth }