import AsyncStorage from '@react-native-community/async-storage';

class AsyncStorageAPI {
  async getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
    }
  }
  async setData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }
  async isNull(key) {
    const data = await this.getData(key);
    return data === null;
  }
  async lastElementId(key) {
    const data = await this.getData(key);
    return data[data.length - 1].id;
  }
}

export default new AsyncStorageAPI();
