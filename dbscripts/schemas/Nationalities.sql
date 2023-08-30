create table
    Nationalities (
        Id int identity constraint PK_Nationalities primary key,
        Name nvarchar(50) not null
    ) go