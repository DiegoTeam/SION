//Libraries
import axios from 'axios';
//Utils
import AsyncStorageAPI from './AsyncStorageAPI';

const baseApi = 'https://opmas.co/rest/v1.0/fest_2019';
class ProjectData {
  async synchronizeProject(data) {
    try {
      await axios({
        method: 'POST',
        url: `${baseApi}/proyectos_api/`,
        data: data,
        config: {headers: {'Content-Type': 'application/json'}},
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getProjects(isConnected) {
    if (isConnected) {
      try {
        const userData = await AsyncStorageAPI.getUserData();
        const query = await axios.get(
          `${baseApi}/proyectos_api/${userData.document}/`,
        );
        const data = [];
        query.data.forEach(element => data.push(element.json.data));
        if (await AsyncStorageAPI.isNull()) {
          await AsyncStorageAPI.setData(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return await AsyncStorageAPI.getData();
  }
}

export default new ProjectData();
