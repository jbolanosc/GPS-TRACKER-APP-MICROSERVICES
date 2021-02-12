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
                    new User() { email = "josue.carit@gmail.com", password = BC.HashPassword("nana"), role = "admin" },
                    new User() { email = "josue.carit1@gmail.com", password = BC.HashPassword("nana1"), role = "checker" },
                    new User() { email = "josue.carit2@gmail.com", password = BC.HashPassword("nana2"), role = "costumer-service" }
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