import AsyncStorage from '@react-native-community/async-storage';

const projectsData = 'projectsData';
const userData = 'userData';

class AsyncStorageAPI {
  async getData() {
    try {
      const data = await AsyncStorage.getItem(projectsData);
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  async setData(data) {
    try {
      await AsyncStorage.setItem(projectsData, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
  async isNull() {
    const data = await this.getData(projectsData);
    if (data === null) {
      return true;
    } else {
      return data.length === 0;
    }
  }
  async lastElementId() {
    const data = await this.getData(projectsData);
    return data[data.length - 1].id;
  }
  async updateElement(id, newData) {
    const data = await this.getData(projectsData);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i] = newData;
      }
    }
    await this.setData(data);
  }
  async addToData(id, item) {
    const data = await this.getData(projectsData);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        item.count = 1;
        data[i].supplies.push(item);
        data[i].budget_used = data[i].budget_used + item.price;
        data[i].isSynchronized = false;
        data[i].budget_available = data[i].budget_available - item.price;
      }
    }
    await this.setData(data);
  }
  async deleteElement(id) {
    const data = await this.getData(projectsData);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
      }
    }
    await this.setData(data);
  }
  async getProject(id) {
    const data = await this.getData(projectsData);
    const element = data.filter(element => element.id === id);
    return element[0];
  }
  async getUserData() {
    try {
      const data = await AsyncStorage.getItem(userData);
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  async setUserData(data) {
    try {
      await AsyncStorage.setItem(userData, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AsyncStorageAPI();
