const { usuarios } = require("../mock/dados.json");

class usuariosService {
  encontrarTodos() {
    return usuarios;
  }

  buscarPeloId(id) {
    return usuarios.find((u) => u.id === id);
  }

  adicionar(usuario) {
    return usuarios.push(usuario);
  }

  atualizar(id, usuarioAtualizado) {
    const usuario = this.buscarPeloId(id);

    usuario.nome = usuarioAtualizado.nome;
    usuario.imagem = usuarioAtualizado.imagem;
    usuario.email = usuarioAtualizado.email;

    return usuario;
  }

  excluir(id) {
    const indiceDoUsuario = usuarios.findIndex((v) => v.id === id);

    return usuarios.splice(indiceDoUsuario, 1);
  }
}

module.exports = new usuariosService();
