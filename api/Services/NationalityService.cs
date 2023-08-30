using Cap_NoArch.Data;
using Cap_NoArch.Data.Entities;
using Cap_NoArch.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cap_NoArch.Services;

public class NationalityService : INationalityService
{
    private readonly ApplicationDBContext context;

    public NationalityService(ApplicationDBContext context)
    {
        this.context = context;
    }

    public async Task<List<Nationality>> GetAllAsync()
    {
        return await this.context.Nationalities.ToListAsync();
    }
}
