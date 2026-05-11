import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  // PROFILE
  profileContainer: {
    alignItems: 'center',

    paddingHorizontal: 24,

    paddingTop: 30,

    paddingBottom: 20,
  },

  avatar: {
    width: 120,

    height: 120,

    borderRadius: 999,
  },

  name: {
    fontSize: 24,

    fontWeight: '700',

    marginTop: 18,
  },

  description: {
    fontSize: 15,

    textAlign: 'center',

    marginTop: 10,

    lineHeight: 22,
  },


  // ACTIONS
  actionsContainer: {
    paddingHorizontal: 16,

    paddingTop: 20,
  },

  actionButton: {
    width: '100%',

    height: 64,

    borderRadius: 16,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 18,

    marginBottom: 16,
  },

  actionText: {
    fontSize: 16,

    fontWeight: '600',

    marginLeft: 14,
  },


  // PUBLISHED
  list: {
    padding: 14,

    paddingBottom: 30,
  },

  postContainer: {
    marginBottom: 24,
  },


  // REMOVE BUTTON
  removeButtonContainer: {
    width: '100%',

    alignItems: 'center',

    marginTop: -4,

    marginBottom: 18,
  },

  removeButton: {
    width: '92%',

    height: 50,

    borderRadius: 14,

    justifyContent: 'center',

    alignItems: 'center',
  },

  removeButtonText: {
    color: '#ffffff',

    fontSize: 15,

    fontWeight: '700',
  },

});