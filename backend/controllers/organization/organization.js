const client = require("../../config/db");
const { use } = require("../../routes/routes");

const createOrganization = async (req, res, next) => {
  try {
    const { name, address, phone, icon } = req.body;
    if (!(name && address && phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Missing some information" });
    }
    // insert coordinates of organization
    // const coordinates=
    const user = await client.query(
      `insert into organization  (name, address, phone, icon)
         values ('${name}','${address}','${phone}','${icon}')`,
    );
    if (user) {
      res.status(200).json({
        success: true,
        message: "Organizatio Created successfully",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
const getOrganizationDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const organizationDetail = await client.query(
      `   select o."name" ,o.phone ,o.address, (jsonb_agg(jsonb_build_object('coordinate1',p.coord1,'coordinate2',p.coord2,'coordinate3',p.coord3,'coordinate4',p.coord4,'coordinate5',p.coord5,'coordinate6',p.coord6)))as organization_coordinates from organization o join premises p on o.id=p.o_id where o.id=${id} and o.deleted_at is null group by o."name",o.phone ,o.address      `,
    );
    if (organizationDetail.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Organization Details",
        data: organizationDetail.rows,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Organization Not Found",
      });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  client.end;
};
module.exports = {
  createOrganization,
  getOrganizationDetail,
};
