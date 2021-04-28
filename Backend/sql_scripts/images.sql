USE [DP_Project]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 19-Nov-2016 11:36:31 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Image]') AND type in (N'U'))
DROP TABLE [dbo].[Image]
GO
/****** Object:  StoredProcedure [dbo].[ImageViewAll]    Script Date: 19-Nov-2016 11:36:31 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ImageViewAll]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[ImageViewAll]
GO
/****** Object:  StoredProcedure [dbo].[ImageAddOrEdit]    Script Date: 19-Nov-2016 11:36:31 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ImageAddOrEdit]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[ImageAddOrEdit]
GO


/****** Object:  StoredProcedure [dbo].[ImageAddOrEdit]    Script Date: 19-Nov-2016 11:36:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ImageAddOrEdit]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[ImageAddOrEdit] 
@imageID INT,
@title VARCHAR(50),
@image IMAGE
AS
BEGIN
	IF(@imageID=0)
		BEGIN
			INSERT INTO image
			(title, image)VALUES
			(@title,@image)
		END
	ELSE
		BEGIN
			UPDATE image
			SET 
			title=@title,
			image=@image
			WHERE imageID=@imageID
		END
	END
' 
END
GO
/****** Object:  StoredProcedure [dbo].[ImageViewAll]    Script Date: 19-Nov-2016 11:36:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ImageViewAll]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'
CREATE PROCEDURE [dbo].[ImageViewAll]
AS
BEGIN
	SELECT imageID,title,image
	FROM image
END
' 
END
GO
/****** Object:  Table [dbo].[Image]    Script Date: 19-Nov-2016 11:36:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Image]') AND type in (N'U'))
BEGIN


-- CREATE TABLE [dbo].[image](
-- 	[imageID] [integer] PRIMARY KEY NOT NULL default NEWID(),
-- 	[title] [varchar](50),
-- 	[image] [image] NOT NULL,
-- )

-- DELETE FROM [dbo].[image] WHERE imageID=2
-- DELETE FROM [dbo].[image] WHERE imageID=3
-- DELETE FROM [dbo].[image] WHERE imageID=4
-- DELETE FROM [dbo].[image] WHERE imageID=5
-- DELETE FROM [dbo].[image] WHERE imageID=6
-- DELETE FROM [dbo].[image] WHERE imageID=7
-- DELETE FROM [dbo].[image] WHERE imageID=8
-- DELETE FROM [dbo].[image] WHERE imageID=9
-- DELETE FROM [dbo].[image] WHERE imageID=10
-- DELETE FROM [dbo].[image] WHERE imageID=11
-- DELETE FROM [dbo].[image] WHERE imageID=12
-- DELETE FROM [dbo].[image] WHERE imageID=13
-- DELETE FROM [dbo].[image] WHERE imageID=14
-- DELETE FROM [dbo].[image] WHERE imageID=15
-- DELETE FROM [dbo].[image] WHERE imageID=16
-- DELETE FROM [dbo].[image] WHERE imageID=17
 -- DROP TABLE [dbo].[image] 
-- DELETE FROM [dbo].[image]



CREATE TABLE [dbo].[image](
	[imageID] [int] IDENTITY(1,1) PRIMARY KEY,
	[title] [varchar](50),
	[image] [image] NOT NULL,
	[tag] [varchar](50),
	[photographer] [varchar](50),
	[url][varchar](200),
)

-- (


-- 	[imageID] ASC
-- )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
-- ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

-- END
-- GO
-- SET ANSI_PADDING OFF
-- GO




-- CREATE TABLE [dbo].[images](
-- 	[image_id] [integer] PRIMARY KEY NOT NULL IDENTITY(0,1),
-- 	[category] [varchar](50) NOT NULL, 
--     [img] [varbinary](max) NOT NULL,
-- )




-- INSERT INTO [dbo].[images] values
-- ( 'animals', (SELECT * FROM OPENROWSET(BULK N'C:\Users\User\Downloads\AABOgXJ.jpg', SINGLE_BLOB) as T1) );

-- -- another option::
-- INSERT INTO [dbo].[SaveFiles] (Name, Files)
-- SELECT 'Home Page 2', 
-- 	BulkColumn FROM OPENROWSET(BULK N'D:\LOGOS\Home Page.png', SINGLE_BLOB) image;

-- -- another option::
-- insert into tableName (ImageColumn) 
-- SELECT BulkColumn 
-- FROM Openrowset( Bulk 'image..Path..here', Single_Blob) as img;


-- -- another option::
-- Insert Into FEMALE(ID, Image)
-- Select '1', BulkColumn 
-- from Openrowset (Bulk 'D:\thepathofimage.jpg', Single_Blob) as Image;

-- -- another option::
-- -- CREATE PROCEDURE [dbo].[UploadFile]
-- -- (
-- --  @Picture image,
-- --  @FileName varchar(250),
-- --  @kFileName bigint output
-- -- )
-- -- AS
-- -- insert into Pictures(Picture, FileName) values (@Picture,@FileName)
-- -- select @kFileName = SCOPE_IDENTITY()