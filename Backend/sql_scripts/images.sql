CREATE TABLE [dbo].[images](
	[image_id] [integer] PRIMARY KEY NOT NULL IDENTITY(0,1),
	[category] [varchar](50) NOT NULL, 
    [img] [varbinary](max) NOT NULL,
)




INSERT INTO [dbo].[images] values
( 'animals', (SELECT * FROM OPENROWSET(BULK N'C:\Users\User\Downloads\AABOgXJ.jpg', SINGLE_BLOB) as T1) );

-- another option::
INSERT INTO [dbo].[SaveFiles] (Name, Files)
SELECT 'Home Page 2', 
	BulkColumn FROM OPENROWSET(BULK N'D:\LOGOS\Home Page.png', SINGLE_BLOB) image;

-- another option::
insert into tableName (ImageColumn) 
SELECT BulkColumn 
FROM Openrowset( Bulk 'image..Path..here', Single_Blob) as img;


-- another option::
Insert Into FEMALE(ID, Image)
Select '1', BulkColumn 
from Openrowset (Bulk 'D:\thepathofimage.jpg', Single_Blob) as Image;

-- another option::
-- CREATE PROCEDURE [dbo].[UploadFile]
-- (
--  @Picture image,
--  @FileName varchar(250),
--  @kFileName bigint output
-- )
-- AS
-- insert into Pictures(Picture, FileName) values (@Picture,@FileName)
-- select @kFileName = SCOPE_IDENTITY()
-- GO