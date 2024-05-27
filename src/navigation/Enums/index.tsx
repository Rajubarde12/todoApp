import Home from "../../screens/Main/home";
import Login from "../../screens/auth/login";
import Register from "../../screens/auth/register";
import Splash from "../../screens/auth/slpash";


export enum MyScreens  {
  HOME_SCREEN = 'HOME_SCREEN',
  SPLASH_SCREEN = 'SPALSH_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
}
const getComponentByName = (screeName: string) => {
  switch (screeName) {
    case MyScreens.SPLASH_SCREEN:
      return Splash;
    case MyScreens.HOME_SCREEN:
      return Home;
    case MyScreens.REGISTER_SCREEN:
      return Register;
    case MyScreens.LOGIN_SCREEN:
      return Login;
    default:
      return Splash ;
  }
};
const _routes = {
  navigation_routes: Object.keys(MyScreens).map(item => {
    let name = item as keyof typeof MyScreens;
    return {
      name: MyScreens[name],
      component: getComponentByName(MyScreens[name]),
    };
  }),
};
export type navigation_params = {
    HOME_SCREEN: undefined;
    SPLASH_SCREEN: undefined;
    REGISTER_SCREEN: undefined;
    LOGIN_SCREEN: undefined;
  };

export default _routes;