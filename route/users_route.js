const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const users_control = require("../control/users_control");


router.get("/", [auth, perm("admin")], users_control.get_all);
router.get("/:id", [auth, perm("admin")], users_control.get_one_by_id);

router.post("/", users_control.post_one);

router.post("/confirmEmail/:id", users_control.confirmEmail_by_id);

router.post("/log", users_control.log_one);

router.post("/mailcarted", users_control.mail_carted);

router.put("/:id", [auth, perm("admin")], users_control.put_one_by_id);

router.delete("/:id", [auth, perm("admin")], users_control.delete_one_by_id);


module.exports = router;