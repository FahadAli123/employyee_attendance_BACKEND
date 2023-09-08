const express = require("express");
const helloController = require("../controllers/hello/hello");
const userController = require("../controllers/users/users");
const organizationController = require("../controllers/organization/organization");
const premisesController = require("../controllers/premises/premises");
const employeeController = require("../controllers/employee/employee");
const roleController=require('../controllers/roles/roles')
const client = require("../config/db");
const { compareFaces } = require("../controllers/imageSimilarity");

const router = express.Router();

let resource = "/attendance";
router.get(
  `${resource}/hello`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  helloController.hello, // call controller.js
);
router.post(
  `${resource}/createUser`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  userController.createUser, // call controller.js
);
router.post(
  `${resource}/user`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  userController.updateUser, // call controller.js
);
router.get(
  `${resource}/users`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  userController.getAllUsers, // call controller.js
);
router.get(
  `${resource}/allEmployee`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  employeeController.getAllEmployee, // call controller.js
);
router.post(
  `${resource}/organization/create`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
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
router.get(
  `${resource}/organization`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  organizationController.getAllOrganizationDetail, // call controller.js
);
router.get(
  `${resource}/role/all`, // path set ho rha hai   localhost:8080/api/v1/gpo/21/payments
  roleController.getAllRoles, // call controller.js
);
// Define API route
router.post("/compare", userController.imageSimi);
module.exports = router;
