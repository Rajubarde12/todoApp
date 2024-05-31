import {takeEvery, put, StrictEffect} from 'redux-saga/effects';
import appwrite from '../../utils/appwrite/Auth';
import {User} from '../../type';
import {ToastAndroid} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {navigation_params} from '../../navigation/Enums';
export interface SetUserAction {
  type: string;
  payload: any;
  data: any;
  navigation: StackNavigationProp<navigation_params>;
}
function* doLogin(action: SetUserAction) {
  try {
    const user: User = yield appwrite.login(action.data);
    if (user) {
      yield put({type: 'todo/loginSuccess', payload: user});
      ToastAndroid.show('Login Success', ToastAndroid.SHORT);
      const userdata: User = yield appwrite.getCurrentUser();
      yield put({
        type: 'todo/setUser',
        payload: user,
      });
      action.navigation.navigate('HOME_SCREEN');
    } else {
      yield put({
        type: 'todo/loginError',
      });
      // ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
    }
  } catch (error) {
    yield put({
      type: 'todo/loginError',
    });
  }
}
export function* mySaga(): Generator<StrictEffect, void, unknown> {
  yield takeEvery('todo/login_request', doLogin);
}
