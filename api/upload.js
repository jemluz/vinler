/*
  BACKEND - API DE UPLOAD DE ARQUIVOS

*/

const multer = require('multer')
const path = require('path')

module.exports = app => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => { 
      console.log(req.body)

      cb(null, `livro-${req.body.userId}-${req.body.livroId}${path.extname(file.originalname)}`) 
    },
    fileFilter: (file, cb) => {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error("INCORRECT_FILETYPE"))
      }
      cb(null, true)
    }
  });

  
  // utiliza a storage para configurar a instância do multer
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 }
  }).single('file'); 

  return { upload }

}