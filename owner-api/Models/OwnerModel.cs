using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace owner_api.Models
{
    public class Owner
    {
        public long id { get; set; }
        [Required]
        public string firstname { get; set; }
        [Required]
        public string lastname { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string country { get; set; }
        [Required]
        public string phone { get; set; }

        public DateTime? createdAt { get; set; }

        public DateTime? updatedAt { get; set; }
    }
}