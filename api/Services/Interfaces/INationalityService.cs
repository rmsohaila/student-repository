using Cap_NoArch.Data.Entities;

namespace Cap_NoArch.Services.Interfaces
{
    public interface INationalityService
    {
        Task<List<Nationality>> GetAllAsync();
    }
}