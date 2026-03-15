
import app from "./src/app.js";
import connectTODB from "./src/config/database.js";
import authRouter from "./src/routes/auth.routes.js";

connectTODB();


// define all the routes here
app.use('/api/auth',authRouter);





// server is listening on Port: 3000
app.listen(3000,()=>{
    console.log("Server is running on Port: 3000");
})