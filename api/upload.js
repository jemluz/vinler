/*
  BACKEND - API DE UPLOAD DE ARQUIVOS

*/

const multer = require('multer')
const path = require('path')

module.exports = app => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) { 
      cb(null, `img-${Date.now()}.${path.extname(file.originalname)}`) 
    },
    fileFilter: function (req, file, cb) {
      const allowed = ["image/jpeg", "image/jpg", "image/png", "image/svg"]
      if (!allowed.includes(file.mimetype)) {
        const error = new Error('Arquivo Inválido!')
        error.code = "INCORRECT_FILETYPE"
        return cb(error, false)
      }
      cb(null, true)
    },
    limits: {
      fileSize: 500000
    }
  });

  // utiliza a storage para configurar a instância do multer
  const upload = multer({ storage });

  // tratamento de erro
  app.use((err, req, res, next) => {
    if (err.code === "INCORRECT_FILETYPE") {
      res.status(422).json({ error: "Apenas imagens são aceitas." })
      return
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(422).json({ error: "Tamanho máximo do arquivo é de 500KB." })
      return
    }
  })

  // rota de upload
  app.post('/upload', upload.single('file'), (req, res) =>  res.json({ file: req.file }));
}