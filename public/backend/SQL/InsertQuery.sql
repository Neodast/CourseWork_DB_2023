USE test123

INSERT INTO Contact
(contactId, nickname, contactName, contactSurname, mobileNumber, email, companyName, companyPosition)
VALUES
(1,'Adr_228','Andriy','Koguhov','+380696969691','str@gmail.com','PolitechKONTORA','Lecturer')
select * from Contact

insert into ContactsGroup
(groupId, groupName, contactId)
VALUES
(1, 'Family', 1)
select * from ContactsGroup

insert into SocialNetwork
(snId, snName, snLink, contactId)
VALUES
(1, 'Twitter', 'http//:someLink', 1)
select * from SocialNetwork

insert into Call
(callId, callDate, isResponce, callTime, contactId)
VALUES
(1,'2023-11-20 00:31:42',1,'00:12:40',1)
select * from Call

delete from Call where callId = 1