import React, {useEffect, useRef} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {string} from '../config/String';
import {RNCamera} from 'react-native-camera';
import {useIsFocused} from '@react-navigation/native';
import {_checkPermission, _alertForPermission} from '../util/PermissionsUtils';
import {useNavigation} from '@react-navigation/native';
import {saveToDirectory} from '../util/SaveUtils';

const Home = () => {
  const navigation = useNavigation();

  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    const d = await saveToDirectory(data.uri);
    navigation.navigate('PhotoList');
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <View />;
          return (
            <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> CAPTURE PHOTO </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonStyle: {flex: 0, flexDirection: 'row', justifyContent: 'center'},
});
export default Home;
