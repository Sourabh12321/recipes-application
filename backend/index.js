const express = require("express");
require("dotenv").config();
const {seq} = require("./config/db")
const {userRouter} = require("./routes/userRoute")

const app = express();
app.use(express.json());

app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("home page ");
})




app.listen(process.env.PORT, async () => {
    try {
        seq.authenticate();
        seq
            .sync()
            .then(() => {
                console.log("Database & tables created!");
            })
            .catch((error) => {
                console.error("Error creating database tables:", error);
            });
        console.log(
            `Server is running on port 2000 and connected to DB`
        );
    } catch (error) {
        console.log(error);
    }
});