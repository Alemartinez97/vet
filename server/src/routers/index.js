const express = require("express");
const router = express.Router();
const moment = require("moment");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.send("Succes");
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err);
        const error = new Error("new Error");
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          email: user.email,
          iat: moment().unix(),
          exp: moment().add(5, "minutes").unix(),
        };
        const token = jwt.sign(body, "top_secret");
        return res.json({ token });
      });
    } catch (e) {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You did it!",
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

router.get("/api/user", async (req, res) => {
  const user = await User.find();
  console.log(JSON.stringify(user));
  res.send(user);
});
// router.get("/reserve", async (req, res) => {
//   console.log(req.query);
//   // const task = await Task.find();
//   res.send({ result: "Ok" });
// });
router.post("/api/user", async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;
    const user = new User({
      username,
      email,
      role,
      password,
    });
    let newUser = await user.save();
    res.status(200).send(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error desconcido, Contactarse con soporte" });
  }
});

router.put("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, role, password } = req.body;

    let user = await User.findById(id);

    if (!user) {
      res.status(404).send({ mensaje: "El user con id = ${id}" });
      return;
    }

    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (role) {
      user.role = role;
    }

    if (password) {
      user.password = password;
    }

    user.save();

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});
router.delete("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.deleteOne({ _id: id });

    if (!user) {
      res.status(404).send({ mensaje: "El user  con id = ${id}" });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ mensaje: "Error desconocido" });
  }
});
module.exports = router;
