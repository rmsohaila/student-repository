using Cap_NoArch.Data.Entities;

namespace Cap_NoArch.Services.Interfaces
{
    public interface IStudentService
    {
        Task<Student> CreateStudentAsync(Student student);
        Task DeleteStudentAsync(int id);
        Task<List<Student>> GetAllStudentsAsync();
        Task<Student> GetStudentByIdAsync(int id);
        Task<Student> UpdateStudentAsync(Student student);
    }
}