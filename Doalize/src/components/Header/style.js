import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({

  container: {
    width: '100%',

    height: 70 + StatusBar.currentHeight,

    paddingTop: StatusBar.currentHeight,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderBottomWidth: 1,
  },


  leftContainer: {
    width: 50,

    justifyContent: 'center',

    alignItems: 'flex-start',
  },

  centerContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  rightContainer: {
    width: 50,

    justifyContent: 'center',

    alignItems: 'flex-end',
  },


  title: {
    fontSize: 20,

    fontWeight: '700',
  },


  iconButton: {
    width: 40,

    height: 40,

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 999,
  },

});