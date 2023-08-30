create table
    Nationalities (
        Id int identity constraint PK_Nationalities primary key,
        Name nvarchar(50) not null
    );

create table
    Relationships (
        Id int identity constraint PK_Relationships primary key,
        Name nvarchar(50) not null
    );

create table
    Students (
        id int identity constraint PK_Students primary key,
        firstname nvarchar(max) not null,
        lastname nvarchar(max),
        dob datetime2 not null,
        NationalityId int constraint FK_Students_Nationalities_NationalityId references Nationalities,
        CreatedAt datetime2,
        UpdatedAt datetime2
    );

create table
    FamilyMembers (
        id int identity constraint PK_FamilyMembers primary key,
        firstname nvarchar(max) not null,
        lastname nvarchar(max),
        dob datetime2 not null,
        RelationshipId int not null constraint FK_FamilyMembers_Relationships_RelationshipId references Relationships,
        NationalityId int constraint FK_FamilyMembers_Nationalities_NationalityId references Nationalities,
        StudentId int not null constraint FK_FamilyMembers_Students_StudentId references Students,
        CreatedAt datetime2,
        UpdatedAt datetime2
    );

create index
    IX_FamilyMembers_NationalityId on FamilyMembers (NationalityId);

create index
    IX_FamilyMembers_RelationshipId on FamilyMembers (RelationshipId);

create index
    IX_FamilyMembers_StudentId on FamilyMembers (StudentId);

create index
    IX_Students_NationalityId on Students (NationalityId);

create table
    __EFMigrationsHistory (
        MigrationId nvarchar(150) not null constraint PK___EFMigrationsHistory primary key,
        ProductVersion nvarchar(32) not null
    );