CREATE TABLE [dbo].[users](
	[user_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[email] [varchar](100) NOT NULL UNIQUE,
	[password] [varchar](300) NOT NULL, 
	[firstname] [varchar](50) NOT NULL, 
	[lastname] [varchar](50) NOT NULL, 
	[age] [varchar](50) NOT NULL, 
	[sex] [varchar](10) NOT NULL, 
)