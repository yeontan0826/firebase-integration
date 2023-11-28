import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoginScreen } from '../screens/loginScreen';
import { StorageScreen } from '../screens/storageScreen';

const BottomTab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="LoginScreen" component={LoginScreen} />
      <BottomTab.Screen name="StorageScreen" component={StorageScreen} />
    </BottomTab.Navigator>
  );
};
