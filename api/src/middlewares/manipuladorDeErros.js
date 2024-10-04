function manipuladorDeErros(err, req, next) {
    console.error(err);

    return res.status(err.status || 500).json({
        message: err.message || "erro interno do servidor",
        detalhes:  err.details || {}
    });
}

  modelu.exports = manipeladorDeErros