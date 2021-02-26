using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace report_api.Models
{
    public class Report
    {
        public long id { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public string description { get; set; }

        [Required]
        public string status { get; set; }

        [Required]
        public long gps { get; set; }
        [Required]
        public long owner { get; set; }

        public DateTime? createdAt { get; set; }

        public DateTime? updatedAt { get; set; }
    }
}