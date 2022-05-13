import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import logo from '../assets/images/logo.png'
export default function App() {
  // interface imageInterface {
  //   selectedImage: string,
  //   setSelectedImage: object,
  //   localUri: object
  // }
  let [setSelectedImage, selectedImage]: any = []
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri })
  };
  let openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert("Uh Oh, sharing isn't available on your platform");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }
  if (selectedImage == null) {
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.instruction}>To share a photo from your phone with a friend, just press the button below!</Text>
      <TouchableOpacity onPress={() => openShareDialogAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instruction: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});