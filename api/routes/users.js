const express = require("express");
const router = express.Router();
const oktaClient = require("../lib/oktaClient");

/* Create a new User (register). */
router.post("/", (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      login: req.body.user.email,
    },
    credentials: {
      password: {
        value: req.body.password,
      },
    },
    groupIds: [],
  };
  switch (req.body.group) {
    case "catalog":
      newUser.groupIds.push("00gw12us1toVeKgYN0h7");
      break;
    case "simon":
      newUser.groupIds.push("00gw12bgysuexhFZf0h7");
      break;
  }
  oktaClient
    .createUser(newUser)
    .then((user) => {
      res.status(201);
      res.send(user);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

module.exports = router;
