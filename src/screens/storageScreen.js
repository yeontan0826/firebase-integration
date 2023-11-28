import { useCallback, useState } from 'react';
import { Button, Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styled from 'styled-components/native';

export const StorageScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastUploadImage, setLastUploadImage] = useState(null);

  const onPressPickFile = useCallback(async () => {
    const pickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (pickResult.canceled) {
      return;
    }

    const image = pickResult.assets[0];
    setSelectedImage(image);

    const uri = image.uri;
    const fileNameArray = uri.split('/');
    const fileName = fileNameArray[fileNameArray.length - 1];

    const putResult = await storage()
      .ref(fileName)
      .putFile(Platform.OS === 'ios' ? uri.replace('file://', '') : uri);

    setLastUploadImage(putResult);
  }, []);

  const onPressDownloadImage = useCallback(async () => {
    const downloadUrl = await storage()
      .ref(lastUploadImage.metadata.fullPath)
      .getDownloadURL();

    const { uri } = await FileSystem.createDownloadResumable(
      downloadUrl,
      FileSystem.documentDirectory + lastUploadImage.metadata.name,
      {}
    ).downloadAsync();

    console.log(uri);
  }, [lastUploadImage]);

  return (
    <Container>
      {selectedImage !== null && (
        <SelectedImage source={{ uri: selectedImage.uri }} />
      )}
      <Button title="PICK FILE" onPress={onPressPickFile} />
      <Button title="DOWNLOAD FILE" onPress={onPressDownloadImage} />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SelectedImage = styled.Image`
  width: 200px;
  aspect-ratio: 1;
  border-radius: 8px;
`;
