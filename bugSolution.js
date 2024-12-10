```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Camera, useCameraDevices } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // Loading
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) { 
      let photo = await cameraRef.current.takePictureAsync();
      console.log('Photo:', photo);
    }
  };

  return (
    <View style={styles.container}>
      {devices?.back && (
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef} // Assign the ref here
          />
      )}
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
});

export default App;
```