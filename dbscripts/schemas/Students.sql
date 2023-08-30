create table
    Students (
        id int identity constraint PK_Students primary key,
        firstname nvarchar(max) not null,
        lastname nvarchar(max),
        dob datetime2 not null,
        NationalityId int constraint FK_Students_Nationalities_NationalityId references Nationalities,
        CreatedAt datetime2,
        UpdatedAt datetime2
    ) go

create index
    IX_Students_NationalityId on Students (NationalityId) go