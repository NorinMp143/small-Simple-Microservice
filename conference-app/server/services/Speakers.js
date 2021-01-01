const axios = require('axios');

/**
 * Logic for fetching speakers information
 */
class SpeakerService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
  }

  /**
   * Returns a list of speakers name and short name
   */
  async getNames() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/names`
    });
  }

  /**
   * Get all artwork
   */
  async getAllArtwork() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/artwork`
    });
  }

  /**
   * Get all artwork of a given speaker
   * @param {*} shortname The speakers short name
   */
  async getArtworkForSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/artwork/${shortname}`
    });
  }

  /**
   * Get speaker information provided a shortname
   * @param {*} shortname
   */
  async getSpeaker(shortname) {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/speaker/${shortname}`
    });
  }

  /**
   * Returns a list of speakers with only the basic information
   */
  async getListShort() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/list-short` 
    });
  }

  /**
   * Get a list of speakers
   */
  async getList() {
    const { ip, port } = await this.getService('speakers-service');
    return this.callService({
      method: 'get',
      url: `http://${ip}:${port}/list`
    });
  }

  async callService(requestOptions){
    const res = await axios(requestOptions);
    return res.data;
  }

  async getService(servicename){
    const res = await axios.get(`${this.serviceRegistryUrl}/find/${servicename}/${this.serviceVersionIdentifier}`);
    return res.data;
  }

}

module.exports = SpeakerService;
