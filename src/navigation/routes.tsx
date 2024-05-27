import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import _routes, {MyScreens, navigation_params} from './Enums';

const Routes: React.FC = () => {
  const Stack = createStackNavigator<navigation_params>();
  type routkey = keyof navigation_params;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={MyScreens.SPLASH_SCREEN as routkey}>
      {_routes.navigation_routes.map(screen => (
        <Stack.Screen
          name={screen.name as routkey}
          component={screen.component}
          key={screen.name}
        />
      ))}
    </Stack.Navigator>
  );
};
export default Routes;
