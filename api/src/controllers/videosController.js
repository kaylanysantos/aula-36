const videosService = require("../services/videosService");

const Video = require("../models/Video");
class videosController {
  index(req, res, next) {
    try {
      const filtros = req.query;
      const videos = videosService.encontrarComfiltros(filtros);
      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        res.status(404).json({ mensagem: "Nenhum vídeo encontrado" });
      }
    } catch (erro) {
      next(erro);
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosService.buscarPeloId(id);

      if (video) {
        res.status(200).json(video);
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar vídeo", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const imagepath = req.file?.fileme;
      const { titulo, descricao, image, canalID } = req.body;

      const novoVideo = new Video(titulo, descricao, imagepath, canalID);

      videosService.adicionar(novoVideo);
      res.status(201).json(novoVideo);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar vídeo", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const body = req.body;
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosService.buscarPeloId(id);

      if (!video) {
        return res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }

      videosService.atualizar(id, body);
      res.status(200).json(video);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar vídeo", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const video = videosService.buscarPeloId(id);
      if (video) {
        videosService.excluir(id);
        res.status(200).json({
          mensagem: `Vídeo id:${id} removido com sucesso!`,
          video
        });
      } else {
        res.status(404).json({ mensagem: "Vídeo não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover vídeo", detalhes: erro.message });
    }
  }
}

module.exports = new videosController();
