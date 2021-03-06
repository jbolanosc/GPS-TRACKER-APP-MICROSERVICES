using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace gpsAPI.Models
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<GpsContext>());
            }
        }

        public static void SeedData(GpsContext context)
        {
            System.Console.WriteLine("Applying migrations...");

            context.Database.Migrate();

            if (!context.GpsItems.Any())
            {
                System.Console.WriteLine("Seeding..");
                context.GpsItems.AddRange(
                    new Gps() { name = "GPS120ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS121ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS122ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS123ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS124ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS125ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS126ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS127ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS128ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS129ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS130ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS131ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS132ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS133ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new Gps() { name = "GPS134ARN", latitude = 0.00, longitude = 0.00, owner = 1, status = "active", createdAt = DateTime.Now, updatedAt = DateTime.Now }
                );
                context.SaveChanges();
            }
            else
            {
                System.Console.WriteLine("Already with data not seeding...");
            }
        }
    }
}