import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoter from "./routes/user.route.js";
import authRoter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to mongoDB!");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log("server is running on port 3000!!!");
})

app.use("/api/user", userRoter);
app.use("/api/auth", authRoter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})
