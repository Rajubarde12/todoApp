import {ID, Account, Client, Teams} from 'appwrite';
import {ToastAndroid} from 'react-native';
import Config from 'react-native-config';
const appwriteClient = new Client();
const APPWRITE_ENDPOINT: string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '66518698000044cf0adf';
const data = {
  title: 'Todo Title',
  description: 'Todo Description',
  quantity: 10,
  price: 19.99,
  completed: true,
  tags: ['work', 'personal', 'important'],
  details: {
    name: 'John Doe',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA',
    },
  },
  createdAt: '2024-05-30T12:00:00Z',
  updatedAt: '2024-05-30T14:30:00Z',
  file: {
    filename: 'image.jpg',
    size: 1024,
    mimeType: 'image/jpeg',
  },
};

export type createUserAccount = {
  email: string;
  password: string;
  name: string;
};
export type loginUserAccount = {
  email: string;
  password: string;
  name: string;
};
class AppWriteService {
  account;
  client;
  constructor() {
  this.client=  appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(appwriteClient);
    console.log(APPWRITE_ENDPOINT, APPWRITE_ENDPOINT);
  }
  createAccount = async ({name, email, password}: createUserAccount) => {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        ToastAndroid.show('User Register Successfully', 500);
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      ToastAndroid.show(String(error), 5000);
      console.log('Appwrite create account Error::', error);
    }
  };
  login = async ({email, password}: loginUserAccount) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      ToastAndroid.show(String(error), 5000);
      console.log('Appwrite login user Error::', error);
    }
  };
  getCurrentUser = async () => {
    try {
      return await this.account.get();
    } catch (error) {
      ToastAndroid.show(String(error), 5000);
      console.log('getting current user Error::', error);
    }
  };
  logoutuser = async () => {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      ToastAndroid.show(String(error), 5000);
      console.log('logout current user Error::', error);
    }
  };
 
}
export default new AppWriteService();
