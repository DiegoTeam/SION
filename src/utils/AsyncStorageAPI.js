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
  async updateElement(i, newData) {
    const data = await this.getData(projectsData);
    data[i] = newData;
    await this.setData(data);
  }
  async addToLine(i, line, item, count) {
    const data = await this.getData(projectsData);
    item.count = count;
    data[i].lines[line].supplies.push(item);
    data[i].lines[line].budgetIRACAUsed =
      data[i].lines[line].budgetIRACAUsed + item.price * count.countIRACA;
    data[i].lines[line].budgetCommunityUsed =
      data[i].lines[line].budgetCommunityUsed +
      item.price * count.countCommunity;
    data[i].lines[line].budgetOthersUsed =
      data[i].lines[line].budgetOthersUsed + item.price * count.countOthers;
    data[i].isSynchronized = false;
    data[i].lines[line].budgetIRACAAvailable =
      data[i].lines[line].budgetIRACAAvailable - item.price * count.countIRACA;
    await this.setData(data);
  }
  async getLine(index, lineIndex) {
    const data = await this.getData(projectsData);
    return data[index].lines[lineIndex];
  }
  async editSupple(
    index,
    lineIndex,
    indexSupple,
    count,
    newBudgetIRACAAvailable,
  ) {
    const data = await this.getData(projectsData);
    data[index].lines[lineIndex].budgetIRACAAvailable = newBudgetIRACAAvailable;
    data[index].lines[lineIndex].budgetIRACAUsed =
      data[index].lines[lineIndex].budgetIRACA -
      data[index].lines[lineIndex].budgetIRACAAvailable;
    data[index].isSynchronized = false;
    data[index].lines[lineIndex].budgetCommunityUsed =
      data[index].lines[lineIndex].budgetCommunityUsed -
      data[index].lines[lineIndex].supplies[indexSupple].count.countCommunity *
        data[index].lines[lineIndex].supplies[indexSupple].price;
    data[index].lines[lineIndex].budgetOthersUsed =
      data[index].lines[lineIndex].budgetOthersUsed -
      data[index].lines[lineIndex].supplies[indexSupple].count.countOthers *
        data[index].lines[lineIndex].supplies[indexSupple].price;
    data[index].lines[lineIndex].budgetCommunityUsed =
      data[index].lines[lineIndex].budgetCommunityUsed +
      count.countCommunity *
        data[index].lines[lineIndex].supplies[indexSupple].price;
    data[index].lines[lineIndex].budgetOthersUsed =
      data[index].lines[lineIndex].budgetOthersUsed +
      count.countOthers *
        data[index].lines[lineIndex].supplies[indexSupple].price;
    data[index].lines[lineIndex].supplies[indexSupple].count.countIRACA =
      count.countIRACA;
    data[index].lines[lineIndex].supplies[indexSupple].count.countCommunity =
      count.countCommunity;
    data[index].lines[lineIndex].supplies[indexSupple].count.countOthers =
      count.countOthers;
    await this.setData(data);
  }
  async deleteSupple(index, lineIndex, indexSupple) {
    const data = await this.getData(projectsData);
    data[index].lines[lineIndex].budgetIRACAUsed =
      data[index].lines[lineIndex].budgetIRACAUsed -
      data[index].lines[lineIndex].supplies[indexSupple].price *
        data[index].lines[lineIndex].supplies[indexSupple].count.countIRACA;
    data[index].lines[lineIndex].budgetCommunityUsed =
      data[index].lines[lineIndex].budgetCommunityUsed -
      data[index].lines[lineIndex].supplies[indexSupple].price *
        data[index].lines[lineIndex].supplies[indexSupple].count.countCommunity;
    data[index].lines[lineIndex].budgetOthersUsed =
      data[index].lines[lineIndex].budgetOthersUsed -
      data[index].lines[lineIndex].supplies[indexSupple].price *
        data[index].lines[lineIndex].supplies[indexSupple].count.countOthers;
    data[index].lines[lineIndex].budgetIRACAAvailable =
      data[index].lines[lineIndex].budgetIRACA -
      data[index].lines[lineIndex].budgetIRACAUsed;
    data[index].lines[lineIndex].supplies.splice(indexSupple, 1);
    data[index].isSynchronized = false;
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
  async getProject(i) {
    const data = await this.getData(projectsData);
    return data[i];
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
