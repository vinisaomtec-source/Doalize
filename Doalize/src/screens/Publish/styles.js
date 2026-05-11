import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

  container: {
    flex: 1,
  },


  // SECTION
  section: {
    paddingHorizontal: 16,

    paddingTop: 20,
  },

  label: {
    fontSize: 17,

    fontWeight: '700',

    marginBottom: 14,
  },


  // IMAGE PICKER
  imagePicker: {
    width: '100%',

    height: 180,

    borderWidth: 2,

    borderStyle: 'dashed',

    borderRadius: 18,

    justifyContent: 'center',

    alignItems: 'center',
  },

  imagePickerText: {
    marginTop: 12,

    fontSize: 15,
  },


  // PREVIEW
  previewContainer: {
    marginTop: 16,
  },

  previewImage: {
    width: width * 0.38,

    height: width * 0.38,

    borderRadius: 16,

    marginRight: 12,
  },


  // BUTTON
  buttonContainer: {
    paddingHorizontal: 16,

    paddingTop: 30,

    paddingBottom: 40,
  },

});