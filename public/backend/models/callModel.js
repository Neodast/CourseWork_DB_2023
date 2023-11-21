class callModel {
  constructor(json) {
    this.callId = json.callId;
    this.callDate = json.callDate;
    this.isResponce = json.isResponce;
    this.callTime = json.callTime;
    this.contactId = json.contactId;
  }
}

module.exports = callModel;