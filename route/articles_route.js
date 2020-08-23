
const auth = require("../middlewares/auth");
const perm = require("../middlewares/perm");
const express = require("express");
const router = express.Router();
const articles_control = require("../control/articles_control");


router.get("/", articles_control.get_all);
router.get("/:id", [auth, perm("Administrateur", "Opérateur")], articles_control.get_one_by_id);

router.post("/", articles_control.post_one);

router.put("/:id", [auth, perm("Administrateur", "Opérateur")], articles_control.put_one_by_id);

router.delete("/:id", [auth, perm("Administrateur", "Opérateur")], articles_control.delete_one_by_id);


module.exports = router;