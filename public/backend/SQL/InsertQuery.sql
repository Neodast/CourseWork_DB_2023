USE Contact

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
(2,'2023-02-20',1,'01:01:12',1),
(3,'2023-02-12',1,'00:45:00',1)
select * from Call
