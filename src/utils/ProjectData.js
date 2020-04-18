class ProjectData {
  async post(data) {
    const apiHeaders = new Headers();
    apiHeaders.append('Content-Type', 'application/json');
    try {
      const query = await fetch(
        'http://iracaz1.com/rest/v1.0/fest_2019/proyectos_api/',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: apiHeaders,
        },
      );
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ProjectData();
