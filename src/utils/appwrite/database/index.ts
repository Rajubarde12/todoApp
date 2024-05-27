import {Databases, Permission, Role, ID, Client} from 'appwrite';

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
type post = {
  title: string;
  userId: string;
  status: boolean;
  content: string;
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
  setDocument = async ({userId, title, content, status}: post) => {
    try {
      console.log('called');
      const res = await this.database.createDocument(
        '66531ab5003e23f516c5',
        '66531e290034df7b5e08',
        ID.unique(),
        {
            title,
            userId,
            content,
            status
        },
        [
          Permission.read(Role.any()), // Anyone can view this document
          // Admins can delete this document
        ],
      );
      console.log('Document created successfully:', res);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };
}
export default new dataBaseSerive();
