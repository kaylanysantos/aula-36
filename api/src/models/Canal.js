const { Usuario } = require("./Usuario");
const Video = require("./Video");

class Canal extends Usuario {
  constructor(id, nome, imagem, email, papel) {
    super(id, nome, imagem, email, papel);
    this.videos = [];
    this.inscritos = [];
  }

  // Adicionar um novo vídeo
  static postarVideo(video) {
    const novoVideo = new Video(video);
    this.videos.push(novoVideo);

    return novoVideo;
  }

  // Editar um vídeo por ID
  static editarVideo(idVideo, corpo) {
    const video = this.videos.find((video) => video.id === idVideo);

    video.nome = corpo.nome;
    video.imagem = corpo.imagem;
    video.email = corpo.email;

    return video;
  }

  // Remover um vídeo por ID
  static excluirVideo(idVideo) {
    const index = this.videos.findIndex((video) => video.id === idVideo);

    return this.videos.splice(index, 1);
  }

  //Gerenciar inscritos no canal
  static listarInscritos() {
    return this.inscritos;
  }
}

module.exports = { Canal };
