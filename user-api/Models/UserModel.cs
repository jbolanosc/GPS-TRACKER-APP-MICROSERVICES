using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        public DateTime? createdAt { get; set; }

        public DateTime? updatedAt { get; set; }
    }
}
