const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
//app.use(express.bodyParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

//create and storing user and password
app.post("/users", async (req, res) => {
  try {
    //  const salt = await bcrypt.genSalt(10);
    //  const hashedPassword = await bcrypt.hash(req.body.password, salt); ....orr bcrypt can do it in a single line
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //more the value, more the time taken to create hashedPassword
    //console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json({ msg: "user added with salt+hashed(password)" });
  } catch {
    res.status(500).json({ msg: "something went wrong :(" });
  }
});

//comparing passwords with the given password

app.post("/users/login", async (req, res) => {
  //finding the first object in the array with name as given from frontend,
  //and store that object({name and password}) in variable desired user
  const desiredUser = users.find((ele) => (ele.name = req.body.name));
  // hewre we arte not taking into consideration that if 2 person have same name then what should happen
  if (desiredUser == null) {
    return res.status(400).send("Can Not find User !!!");
  }

  try {
    if (await bcrypt.compare(req.body.password, desiredUser.password)) {
      res.send("Authentication successfull !! :) ");
    } else {
      res.send("Authentication denied !!! :( ");
    }
  } catch {
    res.send(500).send("Something went wrong :(");
  }
});

const port = 6000;
app.listen(port, () => {
  console.log(`APP IS LISTENING ON PORT ${port}`);
});
