const express = require("express");
const helloController = require("../controllers/hello/hello");
const userController = require("../controllers/users/users");
const organizationController = require("../controllers/organization/organization");
const premisesController = require("../controllers/premises/premises");
const employeeController = require("../controllers/employee/employee");
const client = require("../config/db");

const router = express.Router();

let resource = "/attendance";
router.get(
  `${resource}/hello`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  helloController.hello, // call controller.js
);
router.post(
  `${resource}/user`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  userController.createUser, // call controller.js
);
router.post(
  `${resource}/user`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  userController.updateUser, // call controller.js
);
router.post(
  `${resource}/organization`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  organizationController.createOrganization, // call controller.js
);
router.post(
  `${resource}/organization/premises/:id`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  premisesController.addPremises, // call controller.js
);
router.get(
  `${resource}/organization/employee`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  employeeController.registerEmployee, // call controller.js
);
router.get(
  `${resource}/organization/:id`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  organizationController.getOrganizationDetail, // call controller.js
);
// Define API route
router.post("/compare", userController.imageSimi);
module.exports = router;
