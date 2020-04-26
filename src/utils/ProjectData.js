import axios from 'axios';

class ProjectData {
  async post(data) {
    try {
      const query = await axios({
        method: 'POST',
        url: 'http://iracaz1.com/rest/v1.0/fest_2019/proyectos_api/',
        data: data,
        config: {headers: {'Content-Type': 'application/json'}},
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ProjectData();
