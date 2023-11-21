class groupModel {
  constructor(json) {
    this.groupId = json.groupId;
    this.groupName = json.groupName;
    this.contactId = json.contactId;
  }
}

module.exports = groupModel;