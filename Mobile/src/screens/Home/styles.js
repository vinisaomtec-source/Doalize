import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  // FEED
  feed: {
    paddingBottom: 24,
  },


  // DETALHES
  userContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 16,

    paddingVertical: 16,
  },

  avatar: {
    width: 56,

    height: 56,

    borderRadius: 999,
  },

  userInfo: {
    marginLeft: 12,
  },

  username: {
    fontSize: 17,

    fontWeight: '700',
  },

  date: {
    marginTop: 3,

    fontSize: 13,
  },


  // IMAGEM
  image: {
    width: width,

    height: 340,

    resizeMode: 'cover',
  },


  // TEXTO
  content: {
    padding: 16,
  },

  description: {
    fontSize: 16,

    lineHeight: 25,
  },


  // BOTÃO CHAT
  chatButton: {
    height: 56,

    marginHorizontal: 16,

    marginBottom: 30,

    borderRadius: 14,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  chatButtonText: {
    color: '#ffffff',

    fontSize: 16,

    fontWeight: '700',

    marginLeft: 8,
  },

});