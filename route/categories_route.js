
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const categories_control = require("../control/categories_control");


router.get("/", categories_control.get_all);
router.get("/:id", [auth, perm("admin", "admin")], categories_control.get_one_by_id);

router.post("/", categories_control.post_one);

router.put("/:id", [auth, perm("admin")], categories_control.put_one_by_id);

router.delete("/:id", [auth, perm("admin")], categories_control.delete_one_by_id);


module.exports = router;