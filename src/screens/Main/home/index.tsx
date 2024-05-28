import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {navigation_params} from '../../../navigation/Enums';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import database from '../../../utils/appwrite/database';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../utils/responsive';
import TaskModal from './InputModal';

type props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;
const tasks = [
  {
    title: 'Task 1',
    description:
      'This is the first task description, which is intended to be exactly twenty words long for the purpose of this example.',
    status: true,
  },
  {
    title: 'Task 2',
    description:
      'The second task description also needs to contain exactly twenty words, ensuring it meets the specified requirements.',
    status: true,
  },
  {
    title: 'Task 3',
    description:
      'For the third task, the description must be exactly twenty words to fulfill the given constraints correctly.',
    status: true,
  },
  {
    title: 'Task 4',
    description:
      'In the fourth task, we have another description that is crafted to be exactly twenty words in length here.',
    status: true,
  },
  {
    title: 'Task 5',
    description:
      'This fifth task description will also contain exactly twenty words, meeting the specified word count requirement.',
    status: true,
  },
  {
    title: 'Task 6',
    description:
      'For the sixth task, ensure that the description has exactly twenty words to comply with the given constraints.',
    status: true,
  },
  {
    title: 'Task 7',
    description:
      'Seventh task description is designed to be exactly twenty words, just like all the other task descriptions here.',
    status: true,
  },
  {
    title: 'Task 8',
    description:
      'Eighth task description, ensuring it has precisely twenty words as required by the constraints given initially.',
    status: true,
  },
  {
    title: 'Task 9',
    description:
      'Ninth task description should also be exactly twenty words to meet the necessary criteria for the task list.',
    status: true,
  },
  {
    title: 'Task 10',
    description:
      'Finally, the tenth task description is exactly twenty words, completing our list of tasks as required.',
    status: true,
  },
];

// Example usage

const Home: React.FC<props> = () => {
  const {user} = useSelector((state: RootState) => state.data);
  const [visible, setVisible] = useState(false);

  return (
    <View style={{flex: 1}}>
      <TaskModal
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPress={async value => {
          // database.setDocument({...value, email: user?.email!});
          console.log(await database.getAll());
        }}
      />
      <View
        style={{
          marginHorizontal: '5%',
          paddingVertical: '5%',
          elevation: 4,
          shadowColor: '#000',
          backgroundColor: '#fff',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <Text
          style={{
            color: '#191919',
            fontSize: wp(8),
            fontWeight: 'bold',
            width: '40%',
            textAlign: 'center',
          }}>
          Welcome {user?.name}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: '12%',
          marginTop: '5%',
        }}>
        <Text
          style={{
            color: 'black',
            marginLeft: '5%',
            marginTop: '3%',
            fontSize: wp(5),
            fontWeight: '500',
          }}>
          Your Tasks
        </Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={styles.addBtn}>
          <Text>Add New task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        contentContainerStyle={{paddingTop: '5%', paddingBottom: '5%'}}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemContainer}>
              <Text
                style={{color: 'black', fontSize: wp(4.5), fontWeight: '700'}}>
                {item.title}
              </Text>
              <Text style={{color: '#191919'}}>{item.description}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '4%',
                  marginHorizontal: '10%',
                }}>
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: 'red'}]}>
                  <Text style={styles.btnTitle}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnTitle}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    marginVertical: '1%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: 'grey',
  },
  btn: {
    // borderWidth: 1,
    height: hp(4.5),
    width: '40%',
    backgroundColor: 'skyblue',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: 'white',
  },
  addBtn: {
    backgroundColor: 'green',
    height: hp(5.5),
    // width: "30%",
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
