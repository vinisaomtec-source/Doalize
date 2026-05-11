import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  // LISTA
  list: {
    padding: 14,
  },


  // ITEM
  contactItem: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    padding: 14,

    borderRadius: 18,

    marginBottom: 14,

    borderWidth: 1,
  },


  // FOTO
  avatar: {
    width: 58,

    height: 58,

    borderRadius: 999,
  },


  // INFO
  contactInfo: {
    flex: 1,

    marginLeft: 14,
  },

  name: {
    fontSize: 16,

    fontWeight: '700',
  },

  lastMessage: {
    marginTop: 4,

    fontSize: 14,
  },


  // LADO DIREITO
  rightContent: {
    alignItems: 'flex-end',

    justifyContent: 'space-between',

    height: 50,
  },

  time: {
    fontSize: 12,
  },


  // BADGE
  badge: {
    minWidth: 22,

    height: 22,

    borderRadius: 999,

    justifyContent: 'center',

    alignItems: 'center',

    paddingHorizontal: 6,
  },

  badgeText: {
    color: '#ffffff',

    fontSize: 12,

    fontWeight: '700',
  },

});