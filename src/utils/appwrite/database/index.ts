import {Databases, Permission, Role, ID,Query, Client} from 'appwrite';
import {Document} from '../../../type';
import {ToastAndroid} from 'react-native';

export type value = {
  title: string;
  todo_descrtiption: string;
  status: boolean;
  email: string;
  id: string;
};

const appwriteClient = new Client();
const APPWRITE_ENDPOINT: string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '66518698000044cf0adf';
const database_id = '66531ab5003e23f516c5';
const collectionId = '665606a0002784dbe1a4';
class dataBaseSerive {
  database;
  client;
  constructor() {
    this.client = appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }
  setDocument = async ({email, title, todo_descrtiption, status}: value) => {
    try {
      console.log(email);
      const res = await this.database.createDocument(
        database_id, // Collection ID
        collectionId,
        ID.unique(), // Unique document ID
        {
          title,
          todo_descrtiption,
          status,
          email,
        },
        [
          Permission.read(Role.any()), // Anyone can view this document
          // Add other permissions if necessary, like:
          // Permission.update(Role.user(userId)), // User can update
          // Permission.delete(Role.admin()), // Admins can delete this document
        ],
      );
      console.log('Document created successfully:', res);
      ToastAndroid.show('Task create successfully', 500);
      return await this.getAll();
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };
  getAll = async () => {
    try {
      return await this.database.listDocuments(database_id, collectionId);
    } catch (err) {
      console.log('Error to getting documents', err);
    }
  };
  updateTask = async ({email, id, status, title, todo_descrtiption}: value) => {
    try {
      await this.database.updateDocument(database_id, collectionId, id, {
        title,
        email,
        status,
        todo_descrtiption,
      });
      ToastAndroid.show('Task create update', 500);
      return await this.getAll();
    } catch (error) {
      console.log(error);
    }
  };
  deleteTask = async (id: string) => {
    try {
      await this.database.deleteDocument(database_id, collectionId, id);
      return await this.getAll();
    } catch (error) {
      console.log('error with deleting task', error);
    }
  };
}
export default new dataBaseSerive();
