USE test123

CREATE TABLE Kontakt (
  kontaktId Int NOT NULL PRIMARY KEY,
  nickname NVARCHAR(50),
  kontaktName NVARCHAR(50) NOT NULL,
  kontaktSurname NVARCHAR(50),
  mobileNumber NVARCHAR(50),
  email NVARCHAR(50)
);

-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName.TableName', 'U') IS NOT NULL
DROP TABLE SchemaName.TableName
GO
-- Create the table in the specified schema
CREATE TABLE Adress
(
  adressId INT NOT NULL PRIMARY KEY, -- primary key column
  contry NVARCHAR(50) NOT NULL,
  city NVARCHAR(50) NOT NULL,
  street NVARCHAR
);
GO