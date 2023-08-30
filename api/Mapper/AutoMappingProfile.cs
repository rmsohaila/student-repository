using AutoMapper;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.DataTransferObjects.Student;
using Cap_NoArch.Responses.FamilyMember;
using Cap_NoArch.Responses.Student;

namespace Cap_NoArch.Mapper
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile() {
            
            CreateMap<Student, CreateStudentRequest>().ReverseMap();
            CreateMap<Student, UpdateStudentRequest>().ReverseMap();
            CreateMap<FamilyMember, CreateFamilyMemberRequest>().ReverseMap();
            
            CreateMap<Student, StudentResponse>();
            CreateMap<Student, StudentWithNationalityResponse>().ReverseMap();
            CreateMap<FamilyMember, FamilyMemberResponse>().ReverseMap();
            CreateMap<FamilyMember, StudentFamilyMemberResponse>().ReverseMap();

            //CreateMap<IList<FamilyMember>, IList<StudentFamilyMemberResponse>>().ReverseMap();
            //CreateMap<StudentResponse, Student>().ReverseMap();
        }
    }
}
