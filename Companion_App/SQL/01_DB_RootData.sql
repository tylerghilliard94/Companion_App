

USE [CompanionApp]
GO





set identity_insert [UserProfile] on
insert into UserProfile(Id, Image,FireBaseUserId, FullName, DisplayName, Email) values(1, 'https://cdnb.artstation.com/p/assets/images/images/031/366/305/large/emma-main-angle.jpg?1603397638', 'r7rEmWmehvQ9ipe3xgg02XW6S343', 'Tyler Hilliard', 'Lykrin', 'admin@test.com')
set identity_insert [UserProfile] off


GO
