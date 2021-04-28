CREATE TABLE [dbo].[advancedGameScreens](
	[game_id] [integer] NOT NULL, 
    [screenNum] [integer] NOT NULL,
    [images_id] [varchar](100) NOT NULL,
    [target] [varchar](100) NOT NULL,
    [userSelection] [varchar](100), 
    [score] [integer],
    PRIMARY KEY (game_id,screenNum))