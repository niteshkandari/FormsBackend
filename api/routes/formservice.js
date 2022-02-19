const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const FormController = require("../controllers/forms");

router.get("/",checkAuth, FormController.get_all_form);

router.post("/create", checkAuth,FormController.create_form);

router.get("/:formId", checkAuth,FormController.get_form);

router.delete("/:formId", checkAuth,FormController.delete_form);

router.patch("/:formId", checkAuth,FormController.update_form);

module.exports = router;
