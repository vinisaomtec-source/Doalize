import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/Header';

import Input from '../../components/Input';

import Button from '../../components/Button';

import { useTheme } from '../../hooks/useTheme';

import styles from './styles';


export default function PublishScreen() {

  const { theme } = useTheme();


  const [images, setImages] = useState([]);

  const [description, setDescription] =
    useState('');

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


  // PUBLICAR
  async function handlePublish() {

    if (
      images.length === 0 ||
      !description.trim()
    ) {
      return Alert.alert(
        'Atenção',
        'Adicione imagens e descrição.'
      );
    }

    try {

      setLoading(true);

      // API FUTURA

      Alert.alert(
        'Sucesso',
        'Publicação criada.'
      );

      setImages([]);

      setDescription('');

    } catch (error) {

      Alert.alert(
        'Erro',
        'Não foi possível publicar.'
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

      {/* HEADER */}
      <Header title="Publicar" />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* IMAGENS */}
        <View style={styles.section}>

          <Text
            style={[
              styles.label,
              {
                color: theme.text,
              },
            ]}
          >
            Imagens
          </Text>


          <TouchableOpacity
            activeOpacity={0.8}

            onPress={handlePickImages}

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

              color={theme.primary}
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


          {/* PREVIEW */}
          <ScrollView
            horizontal

            showsHorizontalScrollIndicator={
              false
            }

            style={styles.previewContainer}
          >

            {images.map(
              (image, index) => (
                <Image
                  key={index}

                  source={{
                    uri: image,
                  }}

                  style={styles.previewImage}
                />
              )
            )}

          </ScrollView>

        </View>


        {/* DESCRIÇÃO */}
        <View style={styles.section}>

          <Text
            style={[
              styles.label,
              {
                color: theme.text,
              },
            ]}
          >
            Descrição
          </Text>

          <Input
            placeholder="Descreva sua publicação..."

            value={description}

            onChangeText={
              setDescription
            }

            multiline

            numberOfLines={6}
          />

        </View>


        {/* BOTÃO */}
        <View style={styles.buttonContainer}>

          <Button
            title="Publicar"

            onPress={handlePublish}

            loading={loading}
          />

        </View>

      </ScrollView>

    </View>
  );
}