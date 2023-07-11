const client = require("../../config/db");
const { compareFaces } = require("../imageSimilarity");
// Sign Up User api
const createUser = async (req, res, next) => {
  try {
    const { name, gmail, phone, cnic, r_id } = req.body;
    if (!(name && gmail && phone && cnic && r_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing some information" });
    }
    const user = await client.query(
      `insert into users  (name, gmail, phone, cnic,r_id)
     values ('${name}','${gmail}','${phone}','${cnic}','${r_id}')`,
    );
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Created successfully",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
const updateUser = async (req, res, next) => {
  try {
    const { name, gmail, phone, r_id } = req.body;
    if (!(name && gmail && phone && cnic && r_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing some information" });
    }
    const user = await client.query(
      `insert into users  (name, gmail, phone, cnic,r_id)
       values ('${name}','${gmail}','${phone}','${cnic}','${r_id}')`,
    );
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Created successfully",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
const imageSimi = async (req, res) => {
  try {
    // Get the base64-encoded images from the request body
    const { image1, image2 } = req.body;

    // Compare faces
    const results = await compareFaces(image1, image2);

    // Send the results
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
module.exports = {
  createUser,
  updateUser,
  imageSimi,
};
