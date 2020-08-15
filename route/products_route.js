
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const products_control = require("../control/products_control");


router.get("/", [auth, perm("Administrateur", "Opérateur")], products_control.get_all);
router.get("/:id", [auth, perm("Administrateur", "Opérateur")], products_control.get_one_by_id);

router.post("/", [auth, perm("Administrateur", "Opérateur")], products_control.post_one);

router.put("/:id", [auth, perm("Administrateur", "Opérateur")], products_control.put_one_by_id);

router.delete("/:id", [auth, perm("Administrateur", "Opérateur")], products_control.delete_one_by_id);


module.exports = router;