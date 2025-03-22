var express = require("express");
var router = express.Router();
var roleController = require("../controllers/roles");
let {
  check_authentication,
  check_authorization,
} = require("../utils/check_auth");
let constants = require("../utils/constants");
let { CreateErrorRes, CreateSuccessRes } = require("../utils/responseHandler");
const { route } = require("./products");

/* GET users listing. */
router.use(check_authentication);

router.get("/", async function (req, res, next) {
  let roles = await roleController.GetAllUser();
  CreateSuccessRes(res, roles, 200);
});

router.use(check_authorization(constants.ADMIN_PERMISSION));

router.post("/", async function (req, res, next) {
  try {
    let newRole = await roleController.CreateARole(req.body.name);
    CreateSuccessRes(res, newRole, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;