import React, {useState} from 'react';
import {KeyboardType, StyleSheet, TextInput, View} from 'react-native';
import {widthPrecent as wp, heightPercent as hp} from '../../utils/responsive';
import fonts from '../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
type props = {
  placeholder: string;
  password: boolean;
  onChangeText: (text: string) => void;
  keyboardType: KeyboardType;
};

const Input: React.FC<props> = ({
  placeholder,
  password,
  keyboardType,
  onChangeText,
}) => {
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'grey'}
        style={[styles.input, password && {width: '90%'}]}
        placeholder={placeholder}
        secureTextEntry={password && secureText}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {password ? (
        <Ionicons
          onPress={() => setSecureText(prev => !prev)}
          name={secureText ? 'eye' : 'eye-off'}
          style={styles.icon}
        />
      ) : null}
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.8,
    borderColor: 'lightgrey',
    height: hp(6.2),
    paddingLeft: '5%',
    backgroundColor: '#fff',
    borderRadius: wp(2),
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '4%',
  },
  input: {
    color: 'black',
    fontSize: wp(5),
    fontFamily: fonts.robotoRegular,
    height: '100%',
  },
  icon: {
    color: 'grey',
    // position:'absolute',
    alignSelf: 'center',
    // top:'18%',
    // right:'5%',
    fontSize: wp(7),
  },
});
