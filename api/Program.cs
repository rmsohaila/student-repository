using Cap_NoArch.Data;
using Cap_NoArch.Extensions;
using Cap_NoArch.Services;
using Cap_NoArch.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelStateValidation.ActionFilters;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
    options.UseLoggerFactory(LoggerFactory.Create(builder => builder.AddDebug()));
    options.EnableSensitiveDataLogging();
});

#region Dependency Injection Registration
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<INationalityService, NationalityService>();
builder.Services.AddScoped<IRelationshipService, RelationshipService>();
builder.Services.AddScoped<IFamilyMemberServices, FamilyMemberServices>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddAutoMapper(typeof(Program));
#endregion

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:4000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


builder.Services.AddControllers();
builder.Services.AddScoped<ValidationFilterAttribute>();
builder.Services.Configure<ApiBehaviorOptions>(options => options.SuppressModelStateInvalidFilter = true);


var enableSwagger = (bool)builder.Configuration.GetValue(typeof(bool), "EnableSwagger");

if (enableSwagger)
{
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    if (enableSwagger)
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
}

//app.UseAuthorization();

app.MapControllers();

// Automatically Migrate and Seed Datbase at application bootstrap
app.MigrateDatabase<ApplicationDBContext>((context, services) =>
{
    var logger = services.GetService<ILogger<ApplicationDBContextSeed>>();
    ApplicationDBContextSeed.SeedAsync(context, logger).Wait();
});

app.Run();
