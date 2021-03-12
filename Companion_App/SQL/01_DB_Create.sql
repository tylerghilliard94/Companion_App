USE [master]

if db_id('CompanionApp') IS NULL 
		CREATE DATABASE [CompanionApp]
GO

USE [CompanionApp]
GO








DROP TABLE IF EXISTS [UserProfile]














CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Image] nvarchar(255) NOT NULL,
  [FireBaseUserId] NVARCHAR(28) NOT NULL,
  [FullName] nvarchar(50) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [IsDeleted] integer NOT NULL DEFAULT 0,
  
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),
 
)

GO
