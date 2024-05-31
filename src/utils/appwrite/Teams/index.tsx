import {Client, ID, Teams} from 'appwrite';

const appwriteClient = new Client();
const APPWRITE_ENDPOINT: string = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID: string = '66518698000044cf0adf';
const database_id = '66531ab5003e23f516c5';
const collectionId = '665606a0002784dbe1a4';
class TeamsServie {
  team;
  client;
  constructor() {
    this.client = appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);
    this.team = new Teams(this.client);
  }
  inviteIntoTeam = async () => {
    try {
      // const data = await this.team.create(ID.unique(), 'todoTeam', [
      //   'create',
      //   'Update',
      //   'delete',
      // ]);
    this.team.createMembership("6657fbda0026cadf8a4d",["create,update,delete"],"rajubarde54@gmail.com")
    
    } catch (err) {
      console.log('error with team creation', err);
    }
  };
}
export default new TeamsServie();
