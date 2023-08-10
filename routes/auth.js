const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json("This email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save new user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        return res.status(200).json(user);
    }else{
        return res.status(404).json("user or password incorrect");
    }

  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
