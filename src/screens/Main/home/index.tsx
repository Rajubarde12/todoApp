import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {navigation_params} from '../../../navigation/Enums';
import {
  Alert,
  Clipboard,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import database from '../../../utils/appwrite/database';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../utils/responsive';
import TaskModal from './InputModal';
import {Document, taskDocument} from '../../../type';
import AntDesign from 'react-native-vector-icons/AntDesign';
import appwrite from '../../../utils/appwrite/Auth';
import Teams from '../../../utils/appwrite/Teams';

type props = StackScreenProps<navigation_params, 'HOME_SCREEN'>;

const Home: React.FC<props> = ({navigation}) => {
  const {user} = useSelector((state: RootState) => state.data);
  const [visible, setVisible] = useState(false);
  const [todoTaks, setTodoTaks] = useState<Document[]>([]);
  const getAllTasks = async () => {
    const tasks: taskDocument =
      (await database.getAll()) ?? ({} as taskDocument);
    if (tasks) {
      setTodoTaks(tasks.documents);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await appwrite.logoutuser();
            navigation.reset({index: 0, routes: [{name: 'LOGIN_SCREEN'}]});
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <TaskModal
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        onPress={async value => {
          const {status, id, title, todo_descrtiption} = value;
          if (user?.email) {
            const data: taskDocument = await database.setDocument({
              email: user?.email,
              status,
              todo_descrtiption,
              title,
              id,
            });
            setTodoTaks(data.documents);
            setVisible(false);
          }
        }}
        taksToUpdate={false}
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
        <AntDesign
          onPress={async () => {
            confirmLogout();
          }}
          name="logout"
          style={{
            position: 'absolute',
            fontSize: wp(6),
            color: 'grey',
            right: '5%',
            top: '15%',
          }}
        />
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
            // Teams.inviteIntoTeam()
          }}
          style={styles.addBtn}>
          <Text>Add New task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todoTaks}
        contentContainerStyle={{paddingTop: '5%', paddingBottom: '5%'}}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemContainer}>
              <TaskModal
                onClose={() => {
                  setVisibleIndex(-1);
                }}
                visible={visibleIndex == index}
                onPress={async val => {
                  const data: taskDocument = await database.updateTask({
                    ...val,
                    id: item.$id,
                  });
                  setTodoTaks(data.documents);
                  setVisibleIndex(-1);
                }}
                taksToUpdate={item}
              />
              <Text
                style={{color: 'black', fontSize: wp(4.5), fontWeight: '700'}}>
                {item.title}
              </Text>
              <Text style={{color: '#191919', marginVertical: 10}}>
                {item.todo_descrtiption}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '4%',
                  marginHorizontal: '10%',
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    const data: taskDocument = await database.deleteTask(
                      item.$id,
                    );
                    ToastAndroid.show('Task delete successfully', 500);
                    setTodoTaks(data.documents);
                    //  await Teams.inviteIntoTeam()
                  }}
                  style={[styles.btn, {backgroundColor: 'red'}]}>
                  <Text style={styles.btnTitle}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisibleIndex(index);
                  }}
                  style={styles.btn}>
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
