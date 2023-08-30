using Cap_NoArch.Data;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cap_NoArch.Services;

public class StudentService : IStudentService
{
    private readonly ApplicationDBContext _context;
    private readonly ILogger<ApplicationDBContext> _logger;

    public StudentService(ApplicationDBContext context, ILogger<ApplicationDBContext> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Student> CreateStudentAsync(Student student)
    {
        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return student;
    }

    public async Task<List<Student>> GetAllStudentsAsync()
    {
        return await _context.Students.ToListAsync();
    }

    public async Task<Student> GetStudentByIdAsync(int id)
    {
        return await _context.Students.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Student> UpdateStudentAsync(Student student)
    {
        _context.Entry(student).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return student;
    }

    public async Task DeleteStudentAsync(int id)
    {
        var student = await _context.Students.FirstOrDefaultAsync(s => s.Id == id);

        if (student != null)
        {
            _context.Set<Student>().Remove(student);
            await _context.SaveChangesAsync();
        }
    }
}

