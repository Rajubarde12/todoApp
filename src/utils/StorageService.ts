import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private TOKEN: string = 'token';
  private USER_ID: string = 'user';

  public setItem = async (action: string, data: any): Promise<void> => {
    const value = JSON.stringify({ data });
    await AsyncStorage.setItem(action, value);
  };

  public getItem = async (action: string): Promise<any | null> => {
    const item = await AsyncStorage.getItem(action);
    if (item !== null) {
      try {
        const parsedItem = JSON.parse(item);
        return parsedItem.data;
      } catch (e) {
        console.error('Error parsing item:', e);
        return null;
      }
    }
    return null;
  };

  public removeItem = async (action: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(action);
      return true;
    } catch (err) {
      console.error('Error removing item:', err);
      return false;
    }
  };

  public getMultipleItems = async (actions: string[]): Promise<[string, any | null][]> => {
    try {
      const items = await AsyncStorage.multiGet(actions);
      return items.map(([key, value]) => {
        try {
          return [key, JSON.parse(value??'{}').data];
        } catch (e) {
          console.error(`Error parsing item for key ${key}:`, e);
          return [key, null];
        }
      });
    } catch (e) {
      console.error('Error fetching multiple items:', e);
      return actions.map(key => [key, null]);
    }
  };

  public clear = async (): Promise<boolean> => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  };
}

const storage = new StorageService();
export default storage;
