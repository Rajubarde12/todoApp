import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPrecent as wp, heightPercent as hp} from '../../utils/responsive';
import fonts from '../../utils/fonts';
type props = {
  title: string;
  onPress:()=>void
};
const Button: React.FC<props> = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}  activeOpacity={0.7} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderWidth:0.5,
    borderColor:'lightgrey',
    height: hp(6.2),
    // paddingLeft: '5%',
    backgroundColor: 'skyblue',
    borderRadius: wp(2),
    // elevation: 1,
    // shadowColor: 'black',
    // shadowOffset: {
    //   height: 4,
    //   width: 4,
    // },
    marginTop:"5%",
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:wp(5),
    color:'#fff',
    fontFamily:fonts.robotoBold
  }
 
});
