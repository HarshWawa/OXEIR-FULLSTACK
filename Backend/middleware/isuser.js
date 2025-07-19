const allModels = require("../all_models");

exports.isUser = async (req, res, next) => {
  try {
    const jwtEmail = req.user.email;
    console.log("JWT Email:", jwtEmail);

    const user = await allModels.User_Model.findOne({ email: jwtEmail });

    console.log("User found:", user);

    if (!user) {
      req.is_user_exist = false;
      return res.status(401).json({ message: "Unauthorized: User not found." });
    } else {
      req.is_user_exist = true;
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
