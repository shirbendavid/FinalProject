CREATE TABLE [dbo].[userRating](
    [image_id] [integer] NOT NULL,
    [user_id] [UNIQUEIDENTIFIER] NOT NULL,
	[rate][int] NOT NULL,
    PRIMARY KEY (user_id,image_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id))

--fk to image_id