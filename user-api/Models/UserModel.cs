using System.ComponentModel.DataAnnotations;
namespace user_api.Models
{
    public class User
    {
        public long id { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        public string role { get; set; }

    }
}
