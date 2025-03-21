USE [WebAppDB]
GO
/****** Object:  Table [dbo].[ErrorLog]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ErrorLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ErrorMessage] [varchar](500) NULL,
	[ErrorProcedure] [varchar](100) NULL,
	[ErrorSeverity] [int] NULL,
	[ErrorState] [int] NULL,
	[ErrorLine] [int] NULL,
	[ApplicationName] [varchar](100) NULL,
	[ErrorDateTime] [datetime] NULL,
 CONSTRAINT [PK__ErrorLog__3214EC274D21E117] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WA_Department]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WA_Department](
	[DepId] [int] NOT NULL,
	[Departments] [varbinary](50) NULL,
	[CreatedDate] [datetime] NULL,
	[DisplayOrder] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WATaskAssignments]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WATaskAssignments](
	[AssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[TaskID] [int] NULL,
	[AssignedDate] [datetime] NULL,
	[Status] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[AssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WATasks]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WATasks](
	[TaskID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NULL,
	[Assignees] [varchar](50) NULL,
	[DueDate] [datetime] NULL,
	[Category] [varchar](100) NULL,
	[Description] [varchar](500) NULL,
	[Assignor] [varchar](100) NULL,
	[UploadedDocs] [varchar](10) NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_WATasks] PRIMARY KEY CLUSTERED 
(
	[TaskID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WAUsers]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WAUsers](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Department] [varchar](50) NULL,
	[DOB] [varchar](50) NULL,
	[Address] [varchar](200) NULL,
	[Country] [varchar](50) NULL,
	[ContactNo] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK__WAUsers__1788CCAC83D236DE] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__WAUsers__A9D105347A025239] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ErrorLog] ADD  CONSTRAINT [DF__ErrorLog__ErrorD__30F848ED]  DEFAULT (getdate()) FOR [ErrorDateTime]
GO
ALTER TABLE [dbo].[WATaskAssignments] ADD  DEFAULT (getdate()) FOR [AssignedDate]
GO
ALTER TABLE [dbo].[WATaskAssignments] ADD  DEFAULT ('Assigned') FOR [Status]
GO
ALTER TABLE [dbo].[WATasks] ADD  CONSTRAINT [DF__WATasks__Assigno__145C0A3F]  DEFAULT ('Pending') FOR [Assignor]
GO
ALTER TABLE [dbo].[WATasks] ADD  CONSTRAINT [DF__WATasks__Uploade__15502E78]  DEFAULT ('N/A') FOR [UploadedDocs]
GO
ALTER TABLE [dbo].[WATasks] ADD  CONSTRAINT [DF__WATasks__Created__164452B1]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WAUsers] ADD  CONSTRAINT [DF__WAUsers__Created__117F9D94]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WATaskAssignments]  WITH CHECK ADD  CONSTRAINT [FK__WATaskAss__UserI__1920BF5C] FOREIGN KEY([UserID])
REFERENCES [dbo].[WAUsers] ([UserID])
GO
ALTER TABLE [dbo].[WATaskAssignments] CHECK CONSTRAINT [FK__WATaskAss__UserI__1920BF5C]
GO
/****** Object:  StoredProcedure [dbo].[WA_Delete_Users]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	Delete Users \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	10/02/2025	Created
***********************************************************************
*/

create PROCEDURE [dbo].[WA_Delete_Users]
    @UserID INT
AS
BEGIN
    DELETE FROM WAUsers WHERE UserID = @UserID;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Get_Users_Count]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	Total number of employees \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	24/02/2025	Created
***********************************************************************
*/

Create PROCEDURE [dbo].[WA_Get_Users_Count]
AS
BEGIN
    SELECT COUNT(*) AS EmployeeCount FROM WAUsers;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Insert_Tasks]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	Insert \  WATasks 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	10/02/2025	Created
***********************************************************************
*/

CREATE PROCEDURE [dbo].[WA_Insert_Tasks]
    @title		  VARCHAR(50),
    @assignees    VARCHAR(50) NULL,
    @duedate	  Datetime,
    @category	  VARCHAR(50),
    @description  VARCHAR(500),
    @assignor     VARCHAR(200),
    @uploadedDocs Int
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;  -- Start a transaction

    BEGIN TRY
        -- Insert user details into WAUsers table
        INSERT INTO WATasks 
        (
            Title, 
            Assignees, 
            DueDate,
            Category,
            Description,
            Assignor,
            UploadedDocs,
            CreatedDate
        )
        VALUES 
        (
            @title, 
            @assignees, 
            @duedate,
            @category,
            @description,
            @assignor,
            @uploadedDocs,
            GETDATE()
        );

        COMMIT TRANSACTION;  -- Commit if no error
    END TRY
    BEGIN CATCH
        -- Rollback transaction on error
        ROLLBACK TRANSACTION;

        -- Insert error details into ErrorLog table
        INSERT INTO ErrorLog 
        (
            ErrorMessage, 
            ErrorProcedure, 
            ErrorSeverity, 
            ErrorState, 
            ErrorLine, 
			ApplicationName,
            ErrorDateTime
        )
        VALUES 
        (
            ERROR_MESSAGE(), 
            ERROR_PROCEDURE(), 
            ERROR_SEVERITY(), 
            ERROR_STATE(), 
            ERROR_LINE(), 
			APP_NAME(),
            GETDATE()
        );
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Insert_Users]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	Insert \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	10/02/2025	Created
***********************************************************************
*/

CREATE PROCEDURE [dbo].[WA_Insert_Users]
    @firstName   VARCHAR(50),
    @middleName  VARCHAR(50) NULL,
    @lastName    VARCHAR(50),
    @department  VARCHAR(50),
    @dOB         VARCHAR(50),
    @address     VARCHAR(200),
    @country     VARCHAR(50),
    @contactNo   VARCHAR(50),
    @email       VARCHAR(100)    
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;  -- Start a transaction

    BEGIN TRY
        -- Insert user details into WAUsers table
        INSERT INTO WAUsers 
        (
            FirstName, 
            MiddleName, 
            LastName,
            Department,
            DOB,
            Address,
            Country,
            ContactNo,
            Email,
            CreatedDate
        )
        VALUES 
        (
            @firstName, 
            @middleName, 
            @lastName,
            @department,
            @dOB,
            @address,
            @country,
            @contactNo,
            @email,
            GETDATE()
        );

        COMMIT TRANSACTION;  -- Commit if no error
    END TRY
    BEGIN CATCH
        -- Rollback transaction on error
        ROLLBACK TRANSACTION;

        -- Insert error details into ErrorLog table
        INSERT INTO ErrorLog 
        (
            ErrorMessage, 
            ErrorProcedure, 
            ErrorSeverity, 
            ErrorState, 
            ErrorLine,			
			ApplicationName,
            ErrorDateTime
        )
        VALUES 
        (
            ERROR_MESSAGE(), 
            ERROR_PROCEDURE(), 
            ERROR_SEVERITY(), 
            ERROR_STATE(), 
            ERROR_LINE(), 
			APP_NAME(),
            GETDATE()
        );
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Select_Tasks_Info]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	All Tasks info \  WATasks 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	18/02/2025	Created
***********************************************************************
*/

Create PROCEDURE [dbo].[WA_Select_Tasks_Info]
AS
BEGIN
    SELECT * FROM WATasks;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Select_Users]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	All Users \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	10/02/2025	Created
***********************************************************************
*/

create PROCEDURE [dbo].[WA_Select_Users]
AS
BEGIN
    SELECT
        FirstName + ' ' + LastName AS assignee -- Concatenate First and Last Name
    FROM WAUsers;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Select_Users_Info]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	All Users info \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	18/02/2025	Created
***********************************************************************
*/

create PROCEDURE [dbo].[WA_Select_Users_Info]
AS
BEGIN
    SELECT * FROM WAUsers;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Update_Users]    Script Date: 2/24/2025 9:28:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
Created By:			Nadun Tilan
Copyright:			KeeleSoft Limited
***********************************************************************
Purpose/Comments:	Update \  WAUsers 
***********************************************************************
Version History
**************************
Ver 1.0	Nadun	10/02/2025	Created
***********************************************************************
*/

CREATE PROCEDURE [dbo].[WA_Update_Users]
	@UserID INT,
	@FirstName VARCHAR(50),
	@MiddleName VARCHAR(50),
	@LastName VARCHAR(50),
	@Department VARCHAR(50),
	@DOB Date,
	@Address VARCHAR(200),
	@Country VARCHAR(50),
	@ContactNo VARCHAR(50),
    @Email VARCHAR(100),    
    @CreatedDate DATETIME
AS
BEGIN
    Update WAUsers 	
	SET
	FirstName = @FirstName, 
	MiddleName = @MiddleName, 
	LastName = @LastName,
	Department = @Department,
	DOB = @DOB,
	Address = @Address,
	Country = @Country,
	ContactNo = @ContactNo,
	Email = @Email,
	CreatedDate = @CreatedDate
	WHERE UserID = @UserID;
END;
GO
