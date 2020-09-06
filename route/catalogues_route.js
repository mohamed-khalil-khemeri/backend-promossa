
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const catalogues_control = require("../control/catalogues_control");


router.get("/", catalogues_control.get_all);
router.get("/:id", [auth, perm("Administrateur", "Opérateur")], catalogues_control.get_one_by_id);

router.post("/", [auth, perm("admin")], catalogues_control.post_one);

router.post("/promolist/:id", [auth, perm("admin")], catalogues_control.post_promolist);

router.put("/:id", [auth, perm("admin")], catalogues_control.put_one_by_id);

router.delete("/:id", [auth, perm("admin")], catalogues_control.delete_one_by_id);


module.exports = router;