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
    if (data === null) {
      return true;
    } else {
      return data.length === 0;
    }
  }
  async lastElementId() {
    const data = await this.getData(key);
    return data[data.length - 1].id;
  }
  async updateElement(id, newData) {
    const data = await this.getData(key);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i] = newData;
      }
    }
    this.setData(data);
  }
  async addToData(id, item) {
    const data = await this.getData(key);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item.count = 1;
        data[i].supplies.push(item);
        data[i].budget_used = data[i].budget_used + item.price;
        data[i].budget_available = data[i].budget_available - item.price;
      }
    }
    this.setData(data);
  }
  async deleteElement(id) {
    const data = await this.getData(key);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
      }
    }
    this.setData(data);
  }
}

export default new AsyncStorageAPI();
