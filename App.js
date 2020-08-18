import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from './Pages/LoginPage';
import UserShifts from './Pages/UserShifts';
import RegisterPage from './Pages/RegisterPage';
import ContactPage from './Pages/ContactPage';
import ManagerPage from './Pages/ManagerPage';
import RestoreDetails from './Pages/RestoreDetails';
import ShiftsAdvertisingPage from './Pages/ShiftsAdvertisingPage';
import { Feather } from "@expo/vector-icons"


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="LoginPage">
      <Drawer.Screen
        name="UserShifts"
        component={UserShifts}
        options={{
          drawerLabel: 'העלאת משמרת',
          drawerIcon: ({ tintColor }) =>
            <Feather name="upload" size={16} color={tintColor} />
        }}
      />
      <Drawer.Screen
        name="ContactPage"
        component={ContactPage}
        options={{
          drawerLabel: 'יצירת קשר',
          drawerIcon: ({ tintColor }) =>
            <Feather name="trending-up" size={16} color={tintColor} />
        }}
      />
      <Drawer.Screen
        name="ManagerPage"
        component={ManagerPage}
        options={{
          drawerLabel: 'מנהל',
          drawerIcon: ({ tintColor }) =>
            <Feather name="activity" size={16} color={tintColor} />
        }}
      />

      <Drawer.Screen
        name="ShiftsAdvertisingPage"
        component={ShiftsAdvertisingPage}
        options={{
          drawerLabel: 'פרסום משמרות',
          drawerIcon: ({ tintColor }) =>
            <Feather name="log-out" size={16} color={tintColor} />
        }}
      />
      <Drawer.Screen
        name="Log-Out"
        component={LoginPage}
        options={{
          drawerLabel: 'התנתק',
          drawerIcon: ({ tintColor }) =>
            <Feather name="log-out" size={16} color={tintColor} />
        }}
      />
      <Drawer.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ drawerLabel: () => null }}

      />
      <Drawer.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ drawerLabel: () => null }}
      />
      <Drawer.Screen
        name="RestoreDetails"
        component={RestoreDetails}
        options={{ drawerLabel: () => null }}
      />
    </Drawer.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <MyDrawer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="העלאת משמרת" component={UserShifts} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="ContactPage" component={ContactPage} />
          <Stack.Screen name="ManagerPage" component={ManagerPage} />
          <Stack.Screen name="RestoreDetails" component={RestoreDetails} />
          <Stack.Screen name="ShiftsAdvertisingPage" component={ShiftsAdvertisingPage} />
        </Stack.Navigator>
      </MyDrawer>
    </NavigationContainer>
  );
}
export default App;