import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {navigation_params} from '../../../navigation/Enums';
import Background from '../../../components/Background';
import {widthPrecent as wp} from '../../../utils/responsive';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import appwrite from '../../../utils/appwrite/Auth';
import fonts from '../../../utils/fonts';

type props = StackScreenProps<navigation_params, 'LOGIN_SCREEN'>;
const Register: React.FC<props> = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validatePassword(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  const register = async () => {
    const {name, email, password, confirmPassword} = inputs;

    if (!name.trim()) {
      ToastAndroid.show('Please enter your name', ToastAndroid.SHORT);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show("Passwords don't match", ToastAndroid.SHORT);
      return;
    }

    if (!validatePassword(password)) {
      ToastAndroid.show(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        ToastAndroid.LONG,
      );
      return;
    }

    const user = await appwrite.createAccount({
      name: inputs.name,
      password: inputs.password,
      email: inputs.email,
    });
    console.log(user);
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={{height: '10%'}} />
        <Text style={styles.title}>Create Your TODO Account</Text>
        <View style={{height: '8%'}} />
        <View style={styles.mainContainer}>
          <Input
            onChangeText={input => {
              setInputs(prev => ({...prev, name: input}));
            }}
            password={false}
            placeholder="Name"
            keyboardType="default"
          />
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
          <Input
            onChangeText={input => {
              setInputs(prev => ({...prev, confirmPassword: input}));
            }}
            password={true}
            placeholder="Confirm Password"
            keyboardType="default"
          />
          <Button onPress={register} title="Login" />
        </View>
      </SafeAreaView>
    </Background>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: wp(7),
    color: '#fff',
    // fontFamily: fonts.Oswald_Bold,
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '500',
  },
  mainContainer: {
    width: '95%',
    alignSelf: 'center',
  },
});
