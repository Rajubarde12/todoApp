import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {navigation_params} from '../../../navigation/Enums';
import Background from '../../../components/Background';
import appwrite from '../../../utils/appwrite/Auth';
import {useDispatch} from 'react-redux';
type props = StackScreenProps<navigation_params, 'LOGIN_SCREEN'>;
const Splash: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await appwrite.getCurrentUser();
        if (!user) {
          navigation.replace('LOGIN_SCREEN');
        } else {
          dispatch({
            type: 'todo/setUser',
            payload: user,
          });
          navigation.reset({ index: 0, routes: [{ name: 'HOME_SCREEN' }] });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
  
    checkAuthentication();
  }, [navigation, dispatch]);
  
  return (
    <Background>
      <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
        <Text style={{fontSize:30,color:'#fff'}}>Splash</Text>
      </View>
    </Background>
  );
};
export default Splash;
