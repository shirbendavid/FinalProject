CREATE TABLE [dbo].[users](
	[email] [varchar](100) PRIMARY KEY NOT NULL,
	[firstname] [varchar](50) NOT NULL, 
	[lastname] [varchar](50) NOT NULL, 
	[age] [varchar](50) NOT NULL, 
	[sex] [varchar](10) NOT NULL, 
	[status] [varchar](10) default 'active',
	[dateOfRegistration] [datetime] Default GETDATE(),
	[lastLogin] [datetime] default NULL,
	[gameTime] [datetime] default NULL
)