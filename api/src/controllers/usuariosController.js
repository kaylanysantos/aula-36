const { usuarios } = require("../mock/dados.json");
const { Usuario } = require("../models/Usuario");
const UsuarioPapel = require("../models/UsuarioPapel");

class UsuariosController {
  index(req, res) {
    try {
      if (usuarios.length > 0) {
        res.status(200).json(usuarios);
      } else {
        res.status(404).json({ mensagem: "Nenhum usuário encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar usuário", detalhes: erro.message });
    }
  }

  show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuario = usuarios.find((v) => v.id === id);

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

      const novoUsuario = new Usuario(nome, imagem, email, UsuarioPapel.USUARIO_INSCRITO);

      usuarios.push(novoUsuario);
      res.status(201).json(novoUsuario);
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar usuario", detalhes: erro.message });
    }
  }

  update(req, res) {
    try {
      const { nome, imagem, email } = req.body;
      const id = parseInt(req.params.id);
      const usuario = usuarios.find((v) => v.id === id);

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      usuario.nome = nome;
      usuario.imagem = imagem;
      usuario.email = email;

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
      const indiceDoUsuario = usuarios.findIndex((v) => v.id === id);

      if (indiceDoUsuario !== -1) {
        const usuarioRemovido = usuarios.splice(indiceDoUsuario, 1);
        res.status(200).json({
          mensagem: `Usuário id:${id} removido com sucesso!`,
          usuarioRemovido
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

module.exports = new UsuariosController();
