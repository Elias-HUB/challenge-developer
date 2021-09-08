const express = require("express");
const router = express.Router();
let User = require("../models/User");

var randtoken = require("rand-token");
let newtoken = "";
let User1 = new User("Elias", "Valenzuela", "Elias@gmail.com", "ab1234");
let User2 = new User("Agustin", "Ruiz", "Agustin@gmail.com", "ab1234");
let User3 = new User("Matias", "Fernandez", "Matias@gmail.com", "ab1234");
let User4 = new User("Jose", "Maria", "Jose@gmail.com", "ab1234");
let UserArray = [User1, User2, User3, User4];

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);
  let valid = false;
  UserArray.map((user, i) => {
    if (user.email === email && user.password === password) {
      valid = true;
      newtoken = randtoken.generate(16);
      UserArray[i].token = newtoken;
      console.log(UserArray[i]);
    }
  });
  console.log(valid);
  if (valid) {
    res.json({ Status: "success", Token: newtoken });
  } else {
    res.status(401).send("Error");
  }
});

router.get("/users", async (req, res) => {
  const token = req.query.token;
  console.log(token);
  let valid = false;
  UserArray.map((user, i) => {
    if (user.token === token) {
      res.json(UserArray);
      valid = true;
    }
  });
  if (valid) {
    res.json({ Status: "success", Users: UserArray });
  } else {
    res.status(401).send("No autorizado!");
  }
});

router.get("/user/", async (req, res) => {
  const token = req.query.token;
  console.log(token);
  let valid = false;
  UserArray.map((user, i) => {
    if (user.token === token) {
      res.json({ Status: "success", User: user });
      valid = true;
    }
  });
  if (valid == false) {
    res.status(401).send("No autorizado!");
  }
});

router.post("/changePass", async (req, res) => {
  const { email, password, token } = req.body;
  let valid = false;
  UserArray.map((user, i) => {
    if (user.email === email && user.token === token) {
      UserArray[i].password = password;
      valid = true;
    }
  });

  if (valid) {
    res.json({ status: "success" });
  } else {
    res.status(401).send("No autorizado!");
  }
});

module.exports = router;
