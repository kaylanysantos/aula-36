const express = require("express");
const servidor = express();

const rotas = require("./utils/rotas.json")

const videosRoutes = require("./routes/videosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const canaisRoutes = require("./routes/canaisRoutes");
const naoEncontrado =  require("./middlewars/naoEncontrado");
const naoEncontrado = require("./middlewares/manipuladorDeErros")
const path = require('node:path');

// Middleware para permitir requisições JSON
servidor.use(express.json());
servidor.use(express.static(path.resolve(__dirname, ".."  , "public")));

// Usando as rotas
servidor.use("/videos", videosRoutes);
servidor.use("/canais", canaisRoutes);
servidor.use("/usuarios", usuariosRoutes);

servidor.use(naoEncontrado);
servidor.use(manipuladorDeErros);

servidor.get("/", (req, res) => res.json(rotas));

// Inicializando o servidor na porta 3000
servidor.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
