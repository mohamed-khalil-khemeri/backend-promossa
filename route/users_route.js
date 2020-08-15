const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const users_control = require("../control/users_control");


router.get("/", [auth, perm("Administrateur")], users_control.get_all);
router.get("/:id", [auth, perm("Administrateur")], users_control.get_one_by_id);

router.post("/", users_control.post_one);

router.post("/log", users_control.log_one);

router.put("/:id", [auth, perm("Administrateur")], users_control.put_one_by_id);

router.delete("/:id", [auth, perm("Administrateur")], users_control.delete_one_by_id);


module.exports = router;