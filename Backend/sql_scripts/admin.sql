CREATE TABLE [dbo].[admins](
	[admin_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[email] [varchar](100) NOT NULL UNIQUE,
	[password] [varchar](300) NOT NULL, 
	[firstname] [varchar](50) NOT NULL, 
	[lastname] [varchar](50) NOT NULL, 
)

INSERT INTO [dbo].[admins] values
(default, 'admin@gmail.com', 'admin', 'admin', 'admin');