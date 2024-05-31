import React from 'react';
import {ImageBackground, View} from 'react-native';
type props={
    children:React.JSX.Element
}
const Background: React.FC<props> = ({children}) => {
  return (
    <View
      style={{flex: 1}} >
      {/* // source={require('../../assets/background2.jpg')} */}
      {children}
    </View>
  );
};
export default Background