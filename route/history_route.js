
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const history_control = require("../control/history_control");


router.get("/", [auth, perm("Administrateur")], history_control.get_all);
router.get("/:id", [auth, perm("Administrateur")], history_control.get_one_by_id);

router.post("/", [auth, perm("Administrateur")], history_control.post_one);

router.put("/:id", [auth, perm("Administrateur")], history_control.put_one_by_id);

router.delete("/:id", [auth, perm("Administrateur")], history_control.delete_one_by_id);


module.exports = router;