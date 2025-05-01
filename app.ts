import express, {Request,Response} from "express";

import route from "./src/router/route"

const port = Number(process.env.PORT) || 5001;

const app=express();

app.use(express.json());

app.use("/tasks",route)

app.listen(port,()=>{
    console.log(`Listening on port number ${port}...`)
})