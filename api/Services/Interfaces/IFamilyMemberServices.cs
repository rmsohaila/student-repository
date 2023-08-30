using Cap_NoArch.Data.Entities;

namespace Cap_NoArch.Services.Interfaces
{
    public interface IFamilyMemberServices
    {
        Task<FamilyMember> CreateFamilyMemberAsync(FamilyMember member);
        Task DeleteFamilyMemberAsync(int id);
        Task<List<FamilyMember>> GetAllFamilyMembersOfStudentAsync(int studentId);
        Task<FamilyMember> GetFamilyMemberWithNationalityAsync(int id, int nationalityId);
        Task<FamilyMember> GetFamilyMemberByIdAsync(int id);
        Task UpdateFamilyMemberAsync(FamilyMember member);
    }
}