const client = require("../../config/db");

const addPremises = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { coord1, coord2, coord3, coord4, coord5, coord6 } = req.body;
    if (!(coord1 && coord2 && coord3)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing some information" });
    }

    const checkOrganizationExist = await client.query(
      `select * from organization o where o.id=${id} and o.deleted_at is null `,
    );
    console;
    if (checkOrganizationExist.rowCount > 0) {
      const coordinates = await client.query(
        `insert into premises  (coord1, coord2, coord3, coord4, coord5, coord6,o_id)
           values ('${coord1}','${coord2}','${coord3}','${coord4}','${coord5}','${coord6}','${id}')`,
      );
      if (coordinates) {
        res.status(200).json({
          success: true,
          message: "premises added successfully",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
module.exports = {
  addPremises,
};
