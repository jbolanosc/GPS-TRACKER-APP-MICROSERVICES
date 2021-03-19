using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using BC = BCrypt.Net.BCrypt;

namespace user_api.Models
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<UserContext>());
            }
        }

        public static void SeedData(UserContext context)
        {
            System.Console.WriteLine("Applying migrations...");

            context.Database.Migrate();

            if (!context.UserItems.Any())
            {
                System.Console.WriteLine("Seeding..");
                context.UserItems.AddRange(
                    new User() { email = "josue.carit@gmail.com", password = BC.HashPassword("nana"), role = "ADMIN", createdAt = DateTime.Now, updatedAt = DateTime.Now },
                    new User() { email = "dbolanos@gmail.com", password = BC.HashPassword("nana1"), role = "ADMIN", createdAt = DateTime.Now, updatedAt = DateTime.Now }
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