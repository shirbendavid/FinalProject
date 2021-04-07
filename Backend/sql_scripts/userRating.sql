CREATE TABLE [dbo].[userRating](
    [image_id] [integer] NOT NULL,
    [email] [varchar](100) NOT NULL,
	[rate][int] NOT NULL,
    PRIMARY KEY (email,image_id),
	FOREIGN KEY (email) REFERENCES users(email))
