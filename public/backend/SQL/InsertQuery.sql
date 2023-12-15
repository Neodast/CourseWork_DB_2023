USE Contact

INSERT INTO Contact
(contactId, nickname, contactName, contactSurname, mobileNumber, email, companyName, companyPosition, groupId, snId)
VALUES
(1,'Andr_228','Andriy', 'Koguhiv', '+380957618601', 'str1@gmail.com', 'KONTORA', 'Lecturer', 1, 1),
(2,'Fill','Philip', 'Ankoshko', '+3809558585801', 'HillStrike@gmail.com', 'OOO Himish', 'Chair', 1, null),
(3,'GG','George', 'Dastin', '+380654868601', 'DastinShow@gmail.com', 'FarmTramParam', 'Seller', 2, 2),
(4,'HappyPig','Tetiana', 'Oneshko', '+380945689601', 'kikimori@gmail.com', null, null, 2, null),
(5,null,'Sviat', 'Poroshenko', '+380677611512', 'Porohobot123@gmail.com', 'ROSHEN', 'Owner', 3, 3),
(6,'SkyCat','Sophya', 'Ulishko', '+380957611005', 'Uuuuuli555@gmail.com', null, null, 3, null),
(7,null,'Maks', 'Yarich', '+380957121782', 'Makson228@gmail.com', null, null, 4, 4),
(8,null,'Oleksiy', 'Stolar', '+380957644501', 'stolarOL@gmail.com', 'StoliarniyaAndria', 'Owner', 4, null),
(9,'Avocadro','Andriy', 'Ternopilco', '+380976413601', 'ter123@gmail.com', null, null, 5, 5),
(10,null,'Oleksa', 'Derevko', '+380937794201', 'dd_456_vko@gmail.com', 'Kromberg', 'Slave', 5, null)
select * from Contact

insert into ContactGroup
(groupId, groupName)
VALUES
(1, 'Family'),
(2, 'Work'),
(3, 'Study'),
(4, 'Friends'),
(5, 'KONTORA')
select * from ContactGroup

insert into SocialNetwork
(snId, snName, snLink)
VALUES
(1,'Twitter', 'someLInk.com'),
(2,'Facebook', 'someLinkMETA.com'),
(3,'Telegraph', 'someLinkTelegraph.com'),
(4,'Tambler', 'someLinkTambler.com'),
(5,'Instagram', 'someLinkInstagram.com')
select * from SocialNetwork

insert into Call
(callId, callDate, isResponce, callTime, contactId)
VALUES
(1, '12-15-2023', 1, '00:20:13', 1),
(2, '01-27-2023', 1, '00:56:16', 2),
(3, '05-30-2023', 1, '00:54:20', 3),
(4, '10-11-2023', 1, '01:00:54', 4),
(5, '10-12-2023', 1, '00:37:00', 5)
select * from Call
