CREATE TABLE [dbo].[imagesURL](
	[imageID] [int] IDENTITY(1,1) PRIMARY KEY,
	[category] [varchar](50),
	[image] [varchar](max) NOT NULL,
)