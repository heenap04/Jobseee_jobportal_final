// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRoutes.js";
// import applicationRouter from "./routes/application.route.js";
// import jobRouter from "./routes/job.route.js";
// import { dbConnection } from "./database/dbConnection.js";
// import {errorMiddleware} from "./middlewares/error.js";

// const app = express()
// dotenv.config({path:"./config/config.env"});

// app.use(
//     cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ['GET','POST','DELETE','PUT'],
//     credentials: true,
// })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
// }));


// app.use('/api/v1/user',userRouter);
// app.use('/api/v1/application',applicationRouter);
// app.use('/api/v1/job',jobRouter);


// dbConnection();

// app.use(errorMiddleware);

// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoute from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js"; 
import applicationRouter from "./routes/application.route.js";
import jobRouter from "./routes/job.route.js";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js";

const app = express()
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','DELETE','PUT'],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));


app.use('/api/v1/user',userRoute);
app.use('/api/v1/company', companyRouter); 
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);



dbConnection();

app.use(errorMiddleware);

export default app;