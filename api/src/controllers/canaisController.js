const { Canal } = require("../models/Canal");
const UsuarioPapel = require("../models/UsuarioPapel");

class UsuarioDonoController {
  index(req, res) {
    try {
      const canais = canaisService.encontrarTodos();
      if (canais.length > 0) {
        res.status(200).json(canais);
      } else {
        res.status(404).json({ mensagem: "Nenhum canal encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar canals", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const usuario = canaisService.buscarPeloId(id);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensagem: "canal não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar canal", detalhes: erro.message });
    }
  }

  store(req, res) {
    try {
      const { nome, imagem, email } = req.body;

      const novoCanal = new Canal(
        nome,
        imagem,
        email,
        UsuarioPapel.USUARIO_DONO
      );

      canaisService.adicionar(novoCanal);
      res.status(201).json(novoCanal);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar canal", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const body = req.body;
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const usuario = buscarPeloId(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Canal não encontrado" });
      }

      canaisService.atualizar(id, body);
      res.status(200).json(usuario);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar canal", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new Error("O ID não foi passado");
      }

      const canalRemovido = canaisService.buscarPeloId(id);

      if (canalRemovido) {
        canaisService.excluir(id);
        res.status(200).json({
          mensagem: `canal id:${id} removido com sucesso!`,
          canalRemovido
        });
      } else {
        res.status(404).json({ mensagem: "Canal não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover canal", detalhes: erro.message });
    }
  }
}

module.exports = new UsuarioDonoController();
