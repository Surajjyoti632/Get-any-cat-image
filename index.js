import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var username = "";
var password = "";

// function logger(req,res,next){
//     console.log("body is",req.body);
//     username = req.body.type;
//     next();
// }

// app.use(logger);

app.get("/", (req, res) => {
  res.render("index.ejs", { imageUrl: "Waiting for the data..." });
});

app.post("/res", async (req, res) => {
  console.log(req.body);
  console.log(req.body.password);

  const username = req.body.username;
  const password = req.body.password;
  if ((username === "suraj" && password === "hello")) {
    try {
      const result = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          headers: {
            "x-api-key":
              "live_2LQg7Mt5yWMobgjNyGrUV2l5pMij5IlBQAXVBQde1EmHDAZxnOl60nL9VeIPJc8K",
          },
        }
      );
      console.log(result.data);
      const imageUrl= result.data[0].url;
      res.render("index.ejs", {  imageUrl });
    } catch (error) {
      console.log(error);
    }
  }else{
    res.redirect('/')
  }
});

// app.get("/res", async (req, res) => {
//   // console.log("body is",req.body["username"]);
// });

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
