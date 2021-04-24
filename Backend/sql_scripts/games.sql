CREATE TABLE [dbo].[games](
    [game_id] [int] IDENTITY(1,1), 
	[email] [varchar](100) NOT NULL,
    [gameTime] [datetime] Default GETDATE(),
    [scoreGame][integer],
    PRIMARY KEY (email,game_id),
	FOREIGN KEY (email) REFERENCES users(email))