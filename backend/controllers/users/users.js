const client = require("../../config/db");
const { compareFaces } = require("../imageSimilarity");
// Sign Up User api
const createUser = async (req, res, next) => {
  try {
    const { name, gmail, phone, cnic, r_id, o_id } = req.body;
    // if (!(name && gmail && phone && cnic && r_id, o_id)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing some information" });
    // }
    const user = await client.query(
      `insert into users  (name, gmail, phone, cnic,is_active,r_id,o_id)
     values ('${name}','${gmail}','${phone}','${cnic}','true','${r_id}','${o_id}')`,
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
    const { gmail, phone, r_id } = req.body;
    if (!(gmail && phone && cnic && r_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing some information" });
    }
    const updatetheUser = await client.query(``);
    if (updatetheUser) {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
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
const getAllUsers = async (req, res, next) => {
  try {
    const AllUser = await client.query(
      `select u."name",u.gmail,u.phone ,u.created_at ,u.cnic ,u.is_active ,o."name" as organizationname,r."name" as role_name from users u  join organization o on u.o_id =o.id join roles r on u.r_id=r.id
      `,
    );

    res.status(200).json({
      success: true,
      message: "",
      // data: AllUser.rows,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
module.exports = {
  createUser,
  updateUser,
  imageSimi,
  getAllUsers,
};
