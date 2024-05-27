import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {navigation_params} from '../../../navigation/Enums';
import Background from '../../../components/Background';
import {widthPrecent as wp} from '../../../utils/responsive';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import fonts from '../../../utils/fonts';
import {useDispatch} from 'react-redux';

type props = StackScreenProps<navigation_params, 'LOGIN_SCREEN'>;
const Login: React.FC<props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const Login = async () => {
    if (!inputs.email) {
      ToastAndroid.show('please enter email', 500);
      return;
    }
    if (!inputs.password) {
      ToastAndroid.show('Please enter password', 500);
      return;
    }
    dispatch({
      type: 'todo/login_request',
      data: inputs,
      navigation,
    });
  };
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={{height: '10%'}} />
        <Text style={styles.title}>Welcome To Todo App</Text>
        <View style={{height: '15%'}} />
        <View style={styles.mainContainer}>
          <Input
            onChangeText={input => {
              setInputs(prev => ({...prev, email: input}));
            }}
            password={false}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Input
            onChangeText={input => {
              setInputs(prev => ({...prev, password: input}));
            }}
            password={true}
            placeholder="Password"
            keyboardType="default"
          />
          <Text
            onPress={() => {
              navigation.navigate('REGISTER_SCREEN');
            }}
            style={{
              textAlign: 'left',
              alignSelf: 'flex-end',
              marginRight: '8%',
              marginTop: '2%',
              fontSize: wp(4.5),
              color: 'grey',
            }}>
            Dont have account?
            <Text style={{fontWeight: 'bold', color: '#fff'}}> Sing up</Text>
          </Text>

          <Button onPress={Login} title="Login" />
        </View>
      </SafeAreaView>
    </Background>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: wp(9),
    color: '#fff',
    // fontFamily: fonts.Oswald_SemiBold,
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});
