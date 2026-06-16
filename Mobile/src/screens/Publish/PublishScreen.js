import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  Ionicons,
} from '@expo/vector-icons';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  useTheme,
} from '../../hooks/useTheme';

import api from '../../services/api';

import styles from './styles';

export default function PublishScreen() {
  const { theme } =
    useTheme();

  const [images, setImages] =
    useState([]);

  const [
    description,
    setDescription,
  ] = useState('');

  const [loading, setLoading] =
    useState(false);

  // SELECIONAR IMAGENS
  async function handlePickImages() {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
      });

    if (!result.canceled) {
      const selectedImages =
        result.assets.map(
          (item) => item.uri
        );

      setImages(selectedImages);
    }
  }

  // FAZER UPLOAD DAS IMAGENS
  async function uploadImages() {
    const uploadedUrls = [];

    for (const uri of images) {
      const fileName =
        uri.split('/').pop();

      const extension =
        fileName
          ?.split('.')
          .pop()
          ?.toLowerCase();

      let mimeType =
        'image/jpeg';

      if (
        extension === 'png'
      ) {
        mimeType =
          'image/png';
      }

      if (
        extension === 'webp'
      ) {
        mimeType =
          'image/webp';
      }

      const formData =
        new FormData();

      formData.append(
        'file',
        {
          uri:
            Platform.OS ===
            'android'
              ? uri
              : uri.replace(
                  'file://',
                  ''
                ),
          name:
            fileName ||
            `image.${extension}`,
          type:
            mimeType,
        }
      );

      const response =
        await api.post(
          '/upload',
          formData,
          {
            transformRequest:
              (data) => data,
            headers: {
              Accept:
                'application/json',
            },
          }
        );

      uploadedUrls.push(
        response.data.file.url
      );
    }

    return uploadedUrls;
  }

  // PUBLICAR
  async function handlePublish() {
    if (
      !description.trim()
    ) {
      return Alert.alert(
        'Atenção',
        'Digite uma descrição.'
      );
    }

    try {
      setLoading(true);

      let uploadedImages =
        [];

      if (
        images.length > 0
      ) {
        uploadedImages =
          await uploadImages();
      }

      await api.post(
        '/posts',
        {
          description,
          images:
            uploadedImages,
        }
      );

      Alert.alert(
        'Sucesso',
        'Publicação criada.'
      );

      setImages([]);
      setDescription('');

    } catch (error) {
      console.log(
        'ERRO:',
        error.response?.data
      );

      console.log(
        'MESSAGE:',
        error.message
      );

      Alert.alert(
        'Erro',
        error.response?.data
          ?.message ||
          error.message
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <Header
        title="Publicar"
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={styles.section}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.text,
              },
            ]}
          >
            Imagens
            (Opcional)
          </Text>

          <TouchableOpacity
            activeOpacity={
              0.8
            }
            onPress={
              handlePickImages
            }
            style={[
              styles.imagePicker,
              {
                backgroundColor:
                  theme.card,
                borderColor:
                  theme.border,
              },
            ]}
          >
            <Ionicons
              name="image-outline"
              size={40}
              color={
                theme.primary
              }
            />

            <Text
              style={[
                styles.imagePickerText,
                {
                  color:
                    theme.textSecondary,
                },
              ]}
            >
              Selecionar imagens
            </Text>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            style={
              styles.previewContainer
            }
          >
            {images.map(
              (
                image,
                index
              ) => (
                <Image
                  key={index}
                  source={{
                    uri:
                      image,
                  }}
                  style={
                    styles.previewImage
                  }
                />
              )
            )}
          </ScrollView>
        </View>

        <View
          style={styles.section}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.text,
              },
            ]}
          >
            Descrição
          </Text>

          <Input
            placeholder="Descreva sua publicação..."
            value={
              description
            }
            onChangeText={
              setDescription
            }
            multiline
            numberOfLines={
              6
            }
          />
        </View>

        <View
          style={
            styles.buttonContainer
          }
        >
          <Button
            title="Publicar"
            onPress={
              handlePublish
            }
            loading={
              loading
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}