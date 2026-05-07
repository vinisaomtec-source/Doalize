import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    width: '100%',

    marginBottom: 14,
  },


  // POSIÇÕES
  myMessageContainer: {
    alignItems: 'flex-end',
  },

  otherMessageContainer: {
    alignItems: 'flex-start',
  },


  // BOLHA
  bubble: {
    maxWidth: '80%',

    paddingHorizontal: 14,

    paddingVertical: 12,

    borderRadius: 18,
  },


  // TEXTO
  messageText: {
    fontSize: 15,

    lineHeight: 22,
  },


  // IMAGEM
  image: {
    width: 220,

    height: 220,

    borderRadius: 18,

    resizeMode: 'cover',
  },


  // HORÁRIO
  time: {
    fontSize: 11,

    marginTop: 4,

    marginHorizontal: 8,
  },

});