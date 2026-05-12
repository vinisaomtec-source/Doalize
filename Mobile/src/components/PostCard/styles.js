import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    width: '100%',

    borderRadius: 18,

    marginBottom: 18,

    overflow: 'hidden',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.1,

    shadowRadius: 5,

    elevation: 4,
  },


  // HEADER
  header: {
    width: '100%',

    paddingHorizontal: 14,

    paddingVertical: 14,
  },

  userInfo: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  avatar: {
    width: 48,

    height: 48,

    borderRadius: 999,

    marginRight: 12,
  },

  username: {
    fontSize: 16,

    fontWeight: '700',
  },

  date: {
    fontSize: 13,

    marginTop: 2,
  },


  // IMAGEM
  postImage: {
    width: width,

    height: 320,

    resizeMode: 'cover',
  },


  // TEXTO
  content: {
    paddingHorizontal: 14,

    paddingVertical: 14,
  },

  description: {
    fontSize: 15,

    lineHeight: 22,
  },


  // ACTIONS
  actions: {
    flexDirection: 'row',

    justifyContent: 'space-around',

    alignItems: 'center',

    paddingVertical: 14,

    borderTopWidth: 1,

    borderTopColor: '#ececec',
  },

  actionButton: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  actionText: {
    marginLeft: 6,

    fontSize: 14,

    fontWeight: '600',
  },

});