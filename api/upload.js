/*
  BACKEND - API DE UPLOAD DE ARQUIVOS

  função filtrarArquivo - 
    Utiliza a variavel tiposPermitidos para delimitar os formatos de imagens aceitaveis.
    Com um if verifica se o arquivo recebido como parâmetro não é um dos tiposPermitidos. Caso positivo, retorna um erro, do contrario passa na verificação. 

  função upload - 
    Fornece parâmetros para o multer, são eles: pasta de destino (onde o arquivo será upado como base64), a função filtrarArquivo, e o tamanho limite da imagem.

*/

const multer = require('multer')

module.exports = app => {
  const filtrarArquivo = (req, file, cb) => {
    const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png"]
    if (!tiposPermitidos.includes(file.mimetype)) {
      const error = new Error('Arquivo Inválido!')
      error.code = "INCORRECT_FILETYPE"
      return cb(error, false)
    }
    cb(null, true)
  }

  const upload = multer({
    dest: './uploads',
    filtrarArquivo,
    limits: {
      fileSize: 500000
    }
  })

  // rota de upload
  app.post('/upload', upload.single('file'), (req, res) => {
      res.json({ file: req.file });
  });

  // tratamento de erro
  app.use((err, req, res, next) => {
    if(err.code === "INCORRECT_FILETYPE") {
      res.status(422).json({ error: "Apenas imagens são aceitas."})
      return
    }
    if(err.code === "LIMIT_FILE_SIZE") {
      res.status(422).json({ error: "Tamanho máximo do arquivo é de 500KB."})
      return
    }
  })
}