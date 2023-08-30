﻿using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Cap_NoArch.Extensions;

public static class HostExtensions
{
    public static IHost MigrateDatabase<TContext>(this IHost host,
        Action<TContext, IServiceProvider> seeder,
        int? retry = 0
    ) where TContext : DbContext
    {
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var logger = services.GetRequiredService<ILogger<TContext>>();
            var context = services.GetService<TContext>();
            
            int retryForAvailability = retry.Value;

            try
            {
                logger.LogInformation("Migrating database associated with context {DbContextName}", typeof(TContext).Name);

                //if the sql server container is not created on run docker compose this
                //migration can't fail for network related exception. The retry options for DbContext only 
                //apply to transient exceptions                    
                InvokeSeeder(seeder, context, services);

                logger.LogInformation("Migrated database associated with context {DbContextName}", typeof(TContext).Name);
            }
            catch (SqlException ex)
            {
                logger.LogError(ex, "An error occurred while migrating the database used on context {DbContextName}", typeof(TContext).Name);

                if(retryForAvailability < 50)
                {
                    retryForAvailability++;
                    System.Threading.Thread.Sleep(2000);
                    MigrateDatabase<TContext>(host, seeder, retryForAvailability);
                }
                
            }
        }

        return host;
    }

    private static void InvokeSeeder<TContext>(
        Action<TContext,
        IServiceProvider> seeder,
        TContext context,
        IServiceProvider services
    )
        where TContext : DbContext
    {
        context.Database.Migrate();
        seeder(context, services);
    }
}
