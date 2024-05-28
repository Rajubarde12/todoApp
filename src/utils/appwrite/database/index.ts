import {Databases, Permission, Role, ID, Client} from 'appwrite';

export type value = {
  title: string;
  todo_descrtiption: string;
  status: boolean;
  email: string;
};

const appwriteClient = new Client();
const APPWRITE_ENDPOINT: string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '66518698000044cf0adf';
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
        '66531ab5003e23f516c5', // Collection ID
        '665606a0002784dbe1a4',
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
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };
  getAll = async () => {
    return await this.database.listDocuments(
      '66531ab5003e23f516c5',
      '665606a0002784dbe1a4',
    );
  };
}
export default new dataBaseSerive();
