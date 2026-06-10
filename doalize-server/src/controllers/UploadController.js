import dotenv from 'dotenv';

dotenv.config();


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


      // USA O SERVER_IP DO .ENV PARA GARANTIR QUE O CELULAR CONSIGA ACESSAR
      // SE NÃO TIVER NO .ENV, CAI NO req.get('host') COMO FALLBACK
      const host =
        process.env.SERVER_IP ||
        req.get('host');

      const fileUrl =
        `${req.protocol}://${host}/uploads/${req.file.filename}`;


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