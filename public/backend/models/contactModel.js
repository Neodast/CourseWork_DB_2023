class contactModel {
  constructor(json) {
    this.contactId = json.contactId;
    this.nickname = json.nickname;
    this.contactName = json.contactName;
    this.contactSurname = json.contactSurname;
    this.mobileNumber = json.mobileNumber;
    this.email = json.email;
    this.companyName = json.companyName;
    this.companyPosition = json.companyPosition;
  }
}

module.exports = contactModel;
