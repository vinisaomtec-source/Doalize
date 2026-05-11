import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

  // CONTAINER
  container: {
    flex: 1,
  },


  // CENTRALIZADO
  center: {
    justifyContent: 'center',

    alignItems: 'center',
  },


  // ROW
  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },


  // SPACE BETWEEN
  spaceBetween: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  // TEXTO
  title: {
    fontSize: 24,

    fontWeight: '700',
  },

  subtitle: {
    fontSize: 16,

    fontWeight: '500',
  },

  text: {
    fontSize: 14,
  },


  // SOMBRA
  shadow: {
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 4,

    elevation: 4,
  },


  // PADDING
  p16: {
    padding: 16,
  },

  px16: {
    paddingHorizontal: 16,
  },

  py16: {
    paddingVertical: 16,
  },

});

export default globalStyles;