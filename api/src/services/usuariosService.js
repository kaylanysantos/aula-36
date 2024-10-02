const { canais } = require("../mock/dados.json");

class canaisService {
  encontrarTodos() {
    return canais;
  }

  buscarPeloId(id) {
    return canais.find((u) => u.id === id);
  }

  adicionar(usuario) {
    return canais.push(usuario);
  }

  atualizar(id, canalAtualizado) {
    const canal = this.buscarPeloId(id);

    canal.nome = canalAtualizado.nome;
    canal.imagem = canalAtualizado.imagem;
    canal.email = canalAtualizado.email;

    return canal;
  }

  excluir(id) {
    const indiceDoCanal = canais.findIndex((v) => v.id === id);

    return canais.splice(indiceDoCanal, 1);
  }
}

module.exports = new canaisService();
