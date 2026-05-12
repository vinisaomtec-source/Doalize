class UploadController {

  // UPLOAD
  async upload(req, res) {

    try {

      if (!req.file) {

        return res.status(400).json({
          message:
            'Nenhum arquivo enviado',
        });
      }


      // URL DA IMAGEM
      const fileUrl = `${req.protocol}://${req.get(
        'host'
      )}/uploads/${req.file.filename}`;


      return res.status(200).json({

        message:
          'Upload realizado com sucesso',

        file: {
          filename:
            req.file.filename,

          originalname:
            req.file.originalname,

          mimetype:
            req.file.mimetype,

          size: req.file.size,

          url: fileUrl,
        },
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          'Erro no upload',
      });
    }
  }

}


export default new UploadController();