const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const CreateUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { username, email, password } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if the email is already in use
    const isEmailInUse = await User.isThisEmailInUse(email);
    if (isEmailInUse) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Create the new user in the database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    console.log("New User Created:", newUser);

    // Respond with the newly created user
    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error in CreateUser:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const GetUser = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(201).json(allUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided email",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect, please try again",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Limit the fields of user returned in the response
    const { _id, username, email: userEmail } = user;
    res.status(200).json({
      success: true,
      user: { id: _id, username, email: userEmail },
      token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during sign-in. Please try again later.",
    });
  }
};

module.exports = { CreateUser, GetUser, Signin };
