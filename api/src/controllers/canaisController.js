const { canais } = require("../mock/dados.json");
const { Canal } = require("../models/Canal");
const UsuarioPapel = require("../models/UsuarioPapel");
const usuariosService = require("../services/usuariosService");

class UsuarioDonoController {
  index(req, res) {
    try {
      const canais = usuariosService.encontrarTodos();
      if (canais.length > 0) {
        res.status(200).json(canais);
      } else {
        res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuários", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        throw new Error("O ID não foi passado");
      }

      const usuario = usuariosService.buscarPeloId(id);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuário", detalhes: erro.message });
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

      usuariosService.adicionar(novoCanal);
      res.status(201).json(novoCanal);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar usuário", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const body = req.body;
      const id = parseInt(req.params.id);
      if (!id) {
        throw new Error("O ID não foi passado");
      }

      const usuario = usuariosService.atualizar(id, body);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      res.status(200).json(usuario);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao editar usuário", detalhes: erro.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        throw new Error("O ID não foi passado");
      }

      const canalRemovido = usuariosService.excluir(id);

      if (canalRemovido) {
        res.status(200).json({
          mensagem: `Usuário id:${id} removido com sucesso!`,
          canalRemovido
        });
      } else {
        res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao remover usuário", detalhes: erro.message });
    }
  }
}

module.exports = new UsuarioDonoController();
