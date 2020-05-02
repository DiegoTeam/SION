//Libraries
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
//Utils
import AsyncStorageAPI from './AsyncStorageAPI';

const baseApi = 'http://iracaz1.com/rest/v1.0/fest_2019';
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

  async getProjects() {
    // try {
    //   const netInfo = await NetInfo.fetch();
    //   if (netInfo.isInternetReachable) {
    //     try {
    //       const userData = await AsyncStorageAPI.getUserData();
    //       const query = await axios.get(
    //         `${baseApi}/proyectos_api/${userData.document}/`,
    //       );
    //       const data = [];
    //       query.data.forEach(element => data.push(element.json.data));
    //       if (await AsyncStorageAPI.isNull()) {
    //         await AsyncStorageAPI.setData(data);
    //       } else {
    //         console.log(data);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    return await AsyncStorageAPI.getData();
  }
}

export default new ProjectData();
