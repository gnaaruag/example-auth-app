const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const onboardUser = async (req, res) => {
  console.log(req.body);
  const hashed = await bcrypt.hash(req.body.password, 10);

  console.log(hashed);

  const data = User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });

  await data
    .save()
    .then(() => {
      console.log("Data saved");
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  res.redirect("login");
};

const verifyLogin = async (req, res) => {
  
	const mail = req.body.email;
	const password = req.body.password;
  
	try {
	  const user = await User.findOne({ email: mail });
  
	  if (!user) {
		// Handle invalid email case securely (avoid info leakage)
		res.status(401).json({ message: "Invalid credentials" });
		return;
	  }
  
	  const isMatch = await bcrypt.compare(password, user.password);
  
	  if (!isMatch) {
		res.status(401).json({ message: "Invalid credentials" });
		return;
	  }
  
	  // Secure session management (avoid session ID exposure)
	  req.session.regenerate((err) => {
		if (err) {
		  console.error(err);
		  res.status(500).json({ message: "Internal server error" });
		  return;
		}
  
		req.session.user = req.sessionID; // Store user ID for later retrieval
		res.cookie('sessionId', req.sessionID, {
			httpOnly: true, // Prevent client-side JavaScript access
			secure: true,   // Only transmit over HTTPS (if applicable)
			maxAge: 1000 * 60 * 60 * 24, // Set expiration (e.g., 1 day)
		  });
		res.status(200).json({ message: "Login successful" });
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Internal server error" });
	}
  };
  
module.exports = {  onboardUser, verifyLogin };
