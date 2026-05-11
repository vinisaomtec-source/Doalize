import api from './api';


// UPLOAD DE IMAGEM
export async function uploadImage(imageUri) {

  try {

    const formData = new FormData();


    // PEGAR NOME DO ARQUIVO
    const fileName =
      imageUri.split('/').pop();


    // PEGAR EXTENSÃO
    const match = /\.(\w+)$/.exec(fileName);

    const fileType = match
      ? `image/${match[1]}`
      : 'image';


    // ADICIONAR ARQUIVO
    formData.append('file', {
      uri: imageUri,

      name: fileName,

      type: fileType,
    });


    // REQUEST
    const response = await api.post(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      }
    );


    return {
      success: true,

      data: response.data,
    };

  } catch (error) {

    console.log(
      'Erro no upload:',
      error
    );

    return {
      success: false,

      message:
        error.response?.data?.message ||
        'Erro ao enviar imagem',
    };
  }
}


// UPLOAD MÚLTIPLO
export async function uploadMultipleImages(
  images
) {

  try {

    const uploads = await Promise.all(
      images.map((image) =>
        uploadImage(image)
      )
    );

    return uploads;

  } catch (error) {

    console.log(
      'Erro no upload múltiplo:',
      error
    );

    return [];
  }
}