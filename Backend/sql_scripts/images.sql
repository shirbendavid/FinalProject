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


CREATE TABLE [dbo].[image](
	[imageID] [int] IDENTITY(1,1) PRIMARY KEY,
	[title] [varchar](50),
	[image] [image] NOT NULL,
	[tag] [varchar](50),
	[photographer] [varchar](50),
	[url][varchar](200),
)
