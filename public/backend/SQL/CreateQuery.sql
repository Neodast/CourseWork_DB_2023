USE Contact

CREATE TABLE Contact (
  contactId Int NOT NULL PRIMARY KEY,
  nickname NVARCHAR(50),
  contactName NVARCHAR(50) NOT NULL,
  contactSurname NVARCHAR(50),
  mobileNumber NVARCHAR(50),
  email NVARCHAR(50),
  companyName NVARCHAR(50),
  companyPosition NVARCHAR(50),
  groupId int REFERENCES ContactGroup (groupId),
  snId int REFERENCES SocialNetwork (snId)
);

drop TABLE Contact;

CREATE TABLE ContactGroup (
  groupId Int NOT NULL PRIMARY KEY,
  groupName NVARCHAR(50)
);

drop table ContactGroup

Create table SocialNetwork (
  snId int not null PRIMARY KEY,
  snName NVARCHAR(50) NOT NULL,
  snLink NVARCHAR(50) NOT NULL
);

drop table SocialNetwork

CREATE table Call (
  callId int not null primary key,
  callDate DATE not null,
  isResponce BIT not null,
  callTime NVARCHAR(10),
  contactId int REFERENCES Contact (contactId),
);

drop table Call
