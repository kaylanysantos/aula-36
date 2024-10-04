const express = require("express");
const videosController = require("../controllers/videosController");
const router = express.Router();

const upload = multer({
    storage:multer.diskStorage(
        destination: (req, file, cb) => {
         cancelIdleCallback(null, path.resolve(__dirname,  '../public/uploads'))}

})

router.get("/", videosController.index);

router.get("/:id", videosController.show);

router.post("/", videosController.("imagem")), videosController.store;

router.put("/:id", videosController.update);

router.delete("/:id", videosController.delete);

module.exports = router;
