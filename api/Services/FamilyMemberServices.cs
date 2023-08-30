using Cap_NoArch.Data.Entities;
using Cap_NoArch.Data;
using Microsoft.EntityFrameworkCore;
using Cap_NoArch.Services.Interfaces;

namespace Cap_NoArch.Services;

public class FamilyMemberServices : IFamilyMemberServices
{
    private readonly ApplicationDBContext _context;

    public FamilyMemberServices(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<FamilyMember> CreateFamilyMemberAsync(FamilyMember member)
    {
        _context.FamilyMembers.Add(member);
        await _context.SaveChangesAsync();
        return member;
    }

    public async Task<List<FamilyMember>> GetAllFamilyMembersOfStudentAsync(int studentId)
    {
        return await _context.FamilyMembers.Where(p => p.StudentId == studentId).ToListAsync();
    }

    public async Task<FamilyMember> GetFamilyMemberWithNationalityAsync(int id, int nationalityId)
    {
        return await _context.FamilyMembers
            .Where(p => p.Id == id && p.NationalityId == nationalityId)
            .FirstOrDefaultAsync();
    }

    public async Task<FamilyMember> GetFamilyMemberByIdAsync(int id)
    {
        return await _context.FamilyMembers.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task UpdateFamilyMemberAsync(FamilyMember member)
    {
        _context.Entry(member).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteFamilyMemberAsync(int id)
    {
        var member = await _context.FamilyMembers.FirstOrDefaultAsync(s => s.Id == id);

        if (member != null)
        {
            _context.Set<FamilyMember>().Remove(member);
            await _context.SaveChangesAsync();
        }
    }
}
