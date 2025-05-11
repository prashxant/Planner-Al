import express,{json }from "express";


const app = express();
app.use(express.json());

app.post("/api/v1/signup" ,( res) => {


        res.json({
            message: "content added",
          });
    
})



app.listen(3000)