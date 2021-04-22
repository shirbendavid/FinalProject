CREATE TABLE [dbo].[ratePerUser](
    [email] [varchar](100) NOT NULL,
	[1][int] NOT NULL Default 0,
	[2][int] NOT NULL Default 0,
	[3][int] NOT NULL Default 0,
	[4][int] NOT NULL Default 0,
	[5][int] NOT NULL Default 0,
	[6][int] NOT NULL Default 0,
	[7][int] NOT NULL Default 0,
	[8][int] NOT NULL Default 0,
	[9][int] NOT NULL Default 0,
	[10][int] NOT NULL Default 0,
    PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES users(email))
