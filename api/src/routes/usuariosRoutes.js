const express = require("express");
const usuariosController = require("../controllers/usuariosController");

const router = express.Router();

router.get("/", usuariosController.index);

router.get("/:id", usuariosController.show);

router.post("/", usuariosController.store);

router.put("/:id", usuariosController.update);

router.delete("/:id", usuariosController.delete);

module.exports = router;
