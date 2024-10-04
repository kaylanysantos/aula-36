const naoEncontrado = (req, res, next) => {
    res.status(404).json({
        mensagem: "O recurso não encontrado",
        caminho: req.origiinaLUrl
    });
};

module.exports = naoEncontrado;