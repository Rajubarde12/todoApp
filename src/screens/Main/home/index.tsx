import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {navigation_params} from '../../../navigation/Enums';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import database from '../../../utils/appwrite/database';
type props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;
const Home: React.FC<props> = () => {
  const {user} = useSelector((state: RootState) => state.data);
  console.log(user);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => database.setDocument(user?.$id!)}  style={{height:30,width:120,borderWidth:1}}>
        <Text style={{color: 'black'}} >
          home
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Home;
