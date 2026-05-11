import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  // MENSAGENS
  messagesContainer: {
    paddingHorizontal: 14,

    paddingVertical: 16,
  },


  // INPUT
  inputContainer: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 12,

    paddingVertical: 10,

    borderTopWidth: 1,
  },


  // BOTÃO ÍCONE
  iconButton: {
    width: 42,

    height: 42,

    justifyContent: 'center',

    alignItems: 'center',
  },


  // INPUT TEXTO
  input: {
    flex: 1,

    minHeight: 48,

    maxHeight: 120,

    borderRadius: 24,

    paddingHorizontal: 16,

    marginHorizontal: 10,

    fontSize: 15,
  },


  // ENVIAR
  sendButton: {
    width: 46,

    height: 46,

    borderRadius: 999,

    backgroundColor: '#2563eb',

    justifyContent: 'center',

    alignItems: 'center',
  },

});