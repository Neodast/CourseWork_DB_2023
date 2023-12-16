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
(10,null,'Oleksa', 'Derevko', '+380937794201', 'dd_456_vko@gmail.com', 'Kromberg', 'Slave', 5, null),
(11, 'Alex', 'Alexandr', 'Ivanov', '+380957618602', 'alex@gmail.com', 'OOO Himish', 'Employee', 1, 1),
(12, 'Maria', 'Mariya', 'Petrova', '+3809558585802', 'maria@gmail.com', 'FarmTramParam', 'Buyer', 2, 2),
(13, null, 'Oleg', 'Sidorov', '+380654868602', 'oleg@gmail.com', 'ROSHEN', 'CEO', 7, 7),
(14, 'Anna', 'Anna', 'Kuznetsova', '+380945689602', 'anna@gmail.com', 'StoliarniyaAndria', 'Employee', 4, 8),
(15, 'Ivan', 'Ivan', 'Kovalenko', '+380677611513', 'ivan@gmail.com', 'Kromberg', 'Manager', 6, 6),
(16, null, 'Yuliia', 'Smirnova', '+380957611006', 'yuliia@gmail.com', null, null, 1, null),
(17, 'Viktorrrr', 'Viktor', 'Pavlenko', '+380957121783', 'viktor@gmail.com', null, null, 4, null),
(18, 'OlenO4ka', 'Elena', 'Ivanova', '+380957644502', 'elena@gmail.com', 'StoliarniyaAndria', 'Manager', 4, null),
(19, 'Serhii', 'Serhii', 'Kuchma', '+380976413602', 'serhii@gmail.com', null, null, 3, null),
(20, 'Ihor', 'Ihor', 'Melnyk', '+380937794202', 'ihor@gmail.com', 'Kromberg', 'Engineer', 2, null),
(21, 'Kolya', 'Nikolay', 'Kovalchuk', '+380957618603', 'kolya@gmail.com', 'OOO Himish', 'Engineer', 1, 1),
(22, 'Olga', 'Olga', 'Semenova', '+3809558585803', 'olga@gmail.com', 'FarmTramParam', 'Seller', 2, 2),
(23, 'Vova', 'Volodymyr', 'Yakovenko', '+380654868603', 'vova@gmail.com', 'ROSHEN', 'Manager', 3, 3),
(24, 'Svetlana', 'Svetlana', 'Kuznetsova', '+380945689603', 'svetlana@gmail.com', 'StoliarniyaAndria', 'Owner', 4, 4),
(25, 'Dmytro', 'Dmytro', 'Kovalenko', '+380677611514', 'dmytro@gmail.com', 'Kromberg', 'Employee', 5, 5),
(26, 'SANA_COMMERS_UKRAINE', 'Oleg', 'Pasha', '+380957611007', 'oksana@gmail.com', null, null, 10, 10),
(27, null, 'Serhiy', 'Pavlenko', '+380957121784', 'serhiy@gmail.com', null, null, 4, null),
(28, 'Iruuuna', 'Iryna', 'Ivanova', '+380957644503', 'irina@gmail.com', 'StoliarniyaAndria', 'Employee', 4, null),
(29, null, 'Volodymyr', 'Kuchma', '+380976413603', 'volodymyr@gmail.com', null, null, 5, null),
(30, 'lego', 'Oleh', 'Prizhuk', '+380937794203', 'oleh@gmail.com', 'Kromberg', 'Manager', 5, null);

insert into ContactGroup
(groupId, groupName)
VALUES
(1, 'Family'),
(2, 'Work'),
(3, 'Sport'),
(4, 'Friends'),
(5, 'KONTORA'),
(6, 'University'),
(7, 'PrivatBank'),
(8, 'Enemies'),
(9, 'Best friends'),
(10, 'Cums');

insert into SocialNetwork
(snId, snName, snLink)
VALUES
(1,'Twitter', 'someLInk.com'),
(2,'Facebook', 'someLinkMETA.com'),
(3,'Telegraph', 'someLinkTelegraph.com'),
(4,'Tambler', 'someLinkTambler.com'),
(5,'Instagram', 'someLinkInstagram.com'),
(6, 'LinkedIn', 'someLinkLinkedIn.com'),
(7, 'YouTube', 'someLinkYouTube.com'),
(8, 'TikTok', 'someLinkTikTok.com'),
(9, 'Reddit', 'someLinkReddit.com'),
(10, 'GitHub', 'someLinkGitHub.com');

insert into Call
(callId, callDate, isResponce, callTime, contactId)
VALUES
(1, '12-15-2023', 1, '00:20:13', 1),
(2, '01-27-2023', 1, '00:56:16', 2),
(3, '05-30-2023', 1, '00:54:20', 3),
(4, '10-11-2023', 1, '01:00:54', 4),
(5, '10-12-2023', 1, '00:37:00', 5),
(6, '10-12-2023', 1, '00:37:00', 5),
(7, '10-12-2023', 1, '00:37:00', 5),
(8, '10-12-2023', 1, '00:37:00', 5),
(9, '10-12-2023', 1, '00:37:00', 5),
(10, '10-12-2023', 1, '00:37:00', 5),
(11, '10-12-2023', 1, '00:37:00', 5),
(12, '10-12-2023', 1, '00:37:00', 5),
(13, '10-12-2023', 1, '00:37:00', 5),
(14, '10-12-2023', 1, '00:37:00', 5),
(15, '10-12-2023', 1, '00:37:00', 5),
(16, '10-12-2023', 1, '00:37:00', 5),
(17, '10-12-2023', 1, '00:37:00', 5),
(18, '10-12-2023', 1, '00:37:00', 5),
(19, '10-12-2023', 1, '00:37:00', 5),
(20, '10-12-2023', 1, '00:37:00', 5);
