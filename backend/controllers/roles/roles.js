const client = require("../../config/db");

const getAllRoles = async (req, res, next) => {
  try {
    const roleDetail = await client.query(
      `select * from roles where deleted_at is null`,
    );
    if (roleDetail.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Roles Details",
        data: roleDetail.rows, 
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Roles Not Found",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
module.exports = {
  getAllRoles,
};
