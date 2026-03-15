import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";

const app = express();



// middleware
app.use(express.json());


// logger -->logs --> dev --> api hit, method, resonse time and other details.
app.use(morgan("dev")); 














export default app;