import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../utils/responsive';

import React, {useEffect, useState} from 'react';
import {value} from '../../../utils/appwrite/database';
import {Document} from '../../../type';

type props = {
  onPress: (value: value) => void;
  onClose: () => void;
  visible: boolean;
  taksToUpdate: Document | boolean;
};
const TaskModal: React.FC<props> = ({
  onPress,
  onClose,

  visible,
  taksToUpdate,
}) => {
  const [inputs, setInputs] = useState({
    title: '',
    todo_descrtiption: '',
    status: true,
    email: '',
  });
  useEffect(() => {
    if (typeof taksToUpdate == 'object') {
      setInputs(prev => ({
        ...prev,
        title: taksToUpdate?.title ?? '',
        status: taksToUpdate?.status ?? '',
        todo_descrtiption: taksToUpdate?.todo_descrtiption ?? '',
        email: taksToUpdate?.email ?? '',
      }));
    }
  }, [taksToUpdate]);
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>New Task</Text>
          <TextInput
            value={inputs.title}
            onChangeText={text => {
              setInputs(prev => ({...prev, title: text}));
            }}
            style={styles.inputContainer}
            placeholder="Title"
            placeholderTextColor={'grey'}
          />

          <TextInput
            style={[styles.inputContainer, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={6}
            value={inputs.todo_descrtiption}
            onChangeText={text => {
              setInputs(prev => ({...prev, todo_descrtiption: text}));
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (inputs.title == '') {
                ToastAndroid.show('Please enter title', 500);
                return;
              }
              if (inputs.todo_descrtiption == '') {
                ToastAndroid.show('Please Enter Description', 500);
              }

              onPress({...inputs, id: ''});
            }}
            style={[styles.btn, {backgroundColor: 'green'}]}>
            <Text style={styles.btnTitle}>
              {taksToUpdate == false ? 'Create' : 'Update'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.btnTitle}>Cancle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default TaskModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 25, 25, 0.8)',
  },
  inputsCOntainer: {
    backgroundColor: '#fff',
    height: '40%',
    width: '97%',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    alignSelf: 'center',
    // marginTop:'5%'
  },
  inputContainer: {
    borderWidth: 0.5,
    marginTop: '15%',
    height: hp(5.5),
    marginHorizontal: '5%',
    paddingLeft: '5%',
    borderRadius: 8,
    color: 'black',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalView: {
    width: '90%',
    height: hp(60),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    // borderWidth: 1,
    height: hp(5),
    width: '80%',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  btnTitle: {
    color: '#fff',
    fontSize: wp(5),
  },
});
