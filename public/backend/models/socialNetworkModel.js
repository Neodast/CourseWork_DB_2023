class snModel {
  constructor(json) {
    this.snId = json.snId;
    this.snName = json.snName;
    this.snLink = json.snLink;
  }
}

module.exports = snModel;