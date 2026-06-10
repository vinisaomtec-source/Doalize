import api from './api';


// UPLOAD DE IMAGEM — usa fetch nativo pois axios tem bug com FormData no Expo
export async function uploadImage(imageUri) {

  try {

    const fileName =
      imageUri.split('/').pop();

    const match = /\.(\w+)$/.exec(fileName);

    let ext = match
      ? match[1].toLowerCase()
      : 'jpeg';

    // jpg não é mime type válido — o correto é jpeg
    if (ext === 'jpg') ext = 'jpeg';

    const fileType = `image/${ext}`;


    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      name: fileName,
      type: fileType,
    });


    // PEGAR O TOKEN DO HEADER PADRÃO DO AXIOS
    const token =
      api.defaults.headers?.Authorization ||
      api.defaults.headers?.common?.Authorization;


    // USAR fetch NATIVO — axios + FormData tem bug no Expo com URIs locais
    const response = await fetch(
      `${api.defaults.baseURL}/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: token } : {}),
        },
        body: formData,
      }
    );


    if (!response.ok) {
      const errorData = await response.json();
      console.log('Erro no upload:', errorData);
      return {
        success: false,
        message: errorData.message || 'Erro ao enviar imagem',
      };
    }


    const data = await response.json();

    return {
      success: true,
      data,
    };

  } catch (error) {

    console.log('Erro no upload:', error.message);

    return {
      success: false,
      message: 'Erro ao enviar imagem',
    };
  }
}


// UPLOAD MÚLTIPLO
export async function uploadMultipleImages(images) {

  const uploads = await Promise.all(
    images.map((image) => uploadImage(image))
  );

  return uploads;
}