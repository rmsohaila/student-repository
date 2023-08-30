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
    ) go

create index
    IX_FamilyMembers_NationalityId on FamilyMembers (NationalityId) go

create index
    IX_FamilyMembers_RelationshipId on FamilyMembers (RelationshipId) go

create index
    IX_FamilyMembers_StudentId on FamilyMembers (StudentId) go