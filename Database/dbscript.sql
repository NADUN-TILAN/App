USE [WebAppDB]
GO
/****** Object:  Table [dbo].[WATaskAssignments]    Script Date: 2/2/2025 7:52:54 PM ******/
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
/****** Object:  Table [dbo].[WATasks]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WATasks](
	[TaskID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](50) NOT NULL,
	[Assignees] [varchar](50) NOT NULL,
	[DueDate] [date] NOT NULL,
	[Category] [varchar](100) NOT NULL,
	[Description] [varchar](500) NULL,
	[Assignor] [varchar](100) NULL,
	[UploadedDocs] [varchar](10) NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[TaskID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WAUsers]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WAUsers](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[MiddleName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Department] [varchar](50) NOT NULL,
	[DOB] [date] NOT NULL,
	[Address] [varchar](200) NOT NULL,
	[Country] [varchar](50) NOT NULL,
	[ContactNo] [varchar](50) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[WATaskAssignments] ADD  DEFAULT (getdate()) FOR [AssignedDate]
GO
ALTER TABLE [dbo].[WATaskAssignments] ADD  DEFAULT ('Assigned') FOR [Status]
GO
ALTER TABLE [dbo].[WATasks] ADD  DEFAULT ('Pending') FOR [Assignor]
GO
ALTER TABLE [dbo].[WATasks] ADD  DEFAULT ('N/A') FOR [UploadedDocs]
GO
ALTER TABLE [dbo].[WATasks] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WAUsers] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[WATaskAssignments]  WITH CHECK ADD FOREIGN KEY([TaskID])
REFERENCES [dbo].[WATasks] ([TaskID])
GO
ALTER TABLE [dbo].[WATaskAssignments]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[WAUsers] ([UserID])
GO
/****** Object:  StoredProcedure [dbo].[WA_DeleteUsers]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[WA_DeleteUsers]
    @UserID INT
AS
BEGIN
    DELETE FROM WAUsers WHERE UserID = @UserID;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_GetUsers]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[WA_GetUsers]
AS
BEGIN
    SELECT * FROM WAUsers;
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Insert_Users]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[WA_Insert_Users]
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
    VALUES (
	@FirstName, 
	@MiddleName, 
	@LastName,
	@Department,
	@DOB,
	@Address,
	@Country,
	@ContactNo,
	@Email,
	@CreatedDate
	);
END;
GO
/****** Object:  StoredProcedure [dbo].[WA_Update_Users]    Script Date: 2/2/2025 7:52:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
