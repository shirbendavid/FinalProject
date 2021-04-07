CREATE TABLE [dbo].[parameters](
	[date] [datetime] PRIMARY KEY NOT NULL DEFAULT GETDATE(),
	[images_in_game] [int] NOT NULL, 
	[images_selectes_in_game] [int] NOT NULL, 
	[minimum_images_rating] [int] NOT NULL, 
	[delay] [int] NOT NULL, 
	[screens_in_game] [int] NOT NULL
)