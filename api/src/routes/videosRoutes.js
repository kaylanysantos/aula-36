const express = require("express");
const videosController = require("../controllers/videosController");

const router = express.Router();

router.get("/", videosController.index);

router.get("/:id", videosController.show);

router.post("/", videosController.store);

router.put("/:id", videosController.update);

router.delete("/:id", videosController.delete);

module.exports = router;
