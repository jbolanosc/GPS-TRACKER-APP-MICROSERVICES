using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gpsAPI.Models
{
    public class Gps
    {
        public long id { set; get; }

        [Required]
        public string name { set; get; }
        [Required]
        public double latitude { set; get; }
        [Required]
        public double longitude { set; get; }
        public long? owner { set; get; }
        [Required]
        public string status { set; get; }

        public DateTime? createdAt { get; set; }

        public DateTime? updatedAt { get; set; }
    }
}