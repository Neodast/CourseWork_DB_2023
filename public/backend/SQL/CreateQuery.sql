USE test123

CREATE TABLE Contact (
  contactId Int NOT NULL PRIMARY KEY,
  nickname NVARCHAR(50),
  contactName NVARCHAR(50) NOT NULL,
  contactSurname NVARCHAR(50),
  mobileNumber NVARCHAR(50),
  email NVARCHAR(50),
  companyName NVARCHAR(50),
  companyPosition NVARCHAR(50)
);

drop TABLE Contact;

CREATE TABLE ContactsGroup (
  groupId Int NOT NULL PRIMARY KEY,
  groupName NVARCHAR(50),
  contactId Int REFERENCES Contact(contactId)
);

drop table ContactsGroup

Create table SocialNetwork (
  snId int not null PRIMARY KEY,
  snName NVARCHAR(50) NOT NULL,
  snLink NVARCHAR(50) NOT NULL,
  contactId int REFERENCES Contact(contactId)
);

drop table SocialNetwork

CREATE table Call (
  callId int not null primary key,
  callDate DATETIME not null,
  isResponce BIT not null,
  callTime TIME(7),
  contactId int REFERENCES Contact(contactId)
);

drop table Call