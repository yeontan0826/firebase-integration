import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firebaseAuth from '@react-native-firebase/auth';
import styled from 'styled-components/native';

GoogleSignin.configure();

export const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const onPressGoogleSignin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const credential = firebaseAuth.GoogleAuthProvider.credential(
        userInfo.idToken
      );

      const result = await firebaseAuth().signInWithCredential(credential);

      setUserInfo({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
      });
    } catch (err) {}
  }, []);

  const getCurrentUserInfo = useCallback(async () => {
    try {
      setLoading(true);

      const userInfo = await GoogleSignin.signInSilently();
      console.log('userInfo => ', userInfo);

      const credential = firebaseAuth.GoogleAuthProvider.credential(
        userInfo.idToken
      );

      const result = await firebaseAuth().signInWithCredential(credential);
      console.log('result => ', result);

      setUserInfo({
        name: result.user.displayName,
        profileImage: result.user.photoURL,
      });
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const onPressLogout = useCallback(async () => {
    try {
      await Promise.all([
        await firebaseAuth().signOut(),
        await GoogleSignin.revokeAccess(),
      ]);

      setUserInfo(null);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator />
      ) : userInfo !== null ? (
        <>
          <ProfileImage source={{ uri: userInfo.profileImage }} />
          <ProfileName>{userInfo.name}</ProfileName>
          <Button title="LOGOUT" onPress={onPressLogout} />
        </>
      ) : (
        <GoogleSigninButton onPress={onPressGoogleSignin} />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50px;
`;

const ProfileName = styled.Text`
  margin-top: 20px;
  font-size: 24px;
`;
