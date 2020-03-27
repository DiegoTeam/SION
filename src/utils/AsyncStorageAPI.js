import AsyncStorage from '@react-native-community/async-storage';

const key = 'projectsData';

class AsyncStorageAPI {
  async getData() {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
    }
  }
  async setData(value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }
  async isNull() {
    const data = await this.getData(key);
    return data === null;
  }
  async lastElementId() {
    const data = await this.getData(key);
    return data[data.length - 1].id;
  }
  async addToData(id, item, count, finalPrice) {
    const data = await this.getData(key);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item.count = count;
        data[i].data.push(item);
        data[i].budget_used = data[i].budget_used + finalPrice;
        data[i].budget_available = data[i].budget_available - finalPrice;
      }
    }
    this.setData(data);
  }
}

export default new AsyncStorageAPI();
