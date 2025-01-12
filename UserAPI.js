const express=require('express');
const authRoutes=require('./routes/user_auth');
const app=express();

app.use(express.json()); //parse json

app.use('/user_auth',authRoutes); // use auth routes

//start server

const PORT=process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));