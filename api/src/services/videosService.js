const videosRepository = require("../services/videosServices");

class videosService {
  encontrarTodos() {
    return videosRepository.encontrarTodos();
  }

   encontarComfiultros(filtros) {
    const videos = videosRepository.encontrarTodos()
    return this.filtarvideos(Videos, filtros);
   }


  filtarvideos(videos, filtrar) {
    return videos.filter(videos =>{
      const tituloValido = filtros.titulo ? video.titulo.toloWercase().includes(filtros.titulo.toloWercase()) :  true;

      return tituloValido;
    })
  }

  buscarPeloId(id) {
    return videosRepository.buscarPelo(id);
  }
  
  adicionar(video) {
    return videosRepository.adicionar(video);
  }

  atualizar(id, videoAtualizado) {
    return videosRepository.atualizar(video);
  }

  excluir(id) {
    return videosRepository.excluir(id);
  }
}

module.exports = new videosService();
