
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const magasins_control = require("../control/magasins_control");


router.get("/", magasins_control.get_all);
router.get("/:id", [auth, perm("Administrateur", "Opérateur")], magasins_control.get_one_by_id);

router.post("/", magasins_control.post_one);

router.put("/:id", [auth, perm("Administrateur", "Opérateur")], magasins_control.put_one_by_id);

router.delete("/:id", [auth, perm("Administrateur", "Opérateur")], magasins_control.delete_one_by_id);


module.exports = router;