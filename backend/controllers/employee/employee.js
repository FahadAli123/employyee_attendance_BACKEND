const client = require("../../config/db");

const registerEmployee = async (req, res, next) => {
  try {
    const { cnic, o_id } = req.query;
    console.log("_____=", req.query);
    const employee = await client.query(
      `select * from employee where cnic = '${cnic}' and o_id ='${o_id}' and deletedat is null`,
    );
    console.log(">>", employee);
    console.log("employee", employee);
    if (employee.rowCount === 1) {
      res.status(200).json({
        success: true,
        message: "user found",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
module.exports = {
  registerEmployee,
};
