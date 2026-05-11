import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  content: {
    flexGrow: 1,

    justifyContent: 'center',

    paddingHorizontal: 24,

    paddingVertical: 40,
  },


  // LOGO
  logoContainer: {
    marginBottom: 50,

    alignItems: 'center',
  },

  logo: {
    fontSize: 42,

    fontWeight: '800',

    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 10,

    fontSize: 15,

    textAlign: 'center',

    lineHeight: 22,
  },


  // FORM
  form: {
    width: '100%',
  },


  // FOOTER
  footer: {
    marginTop: 30,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    flexWrap: 'wrap',
  },

  footerText: {
    fontSize: 15,
  },

  registerText: {
    fontSize: 15,

    fontWeight: '700',

    marginLeft: 6,
  },

});