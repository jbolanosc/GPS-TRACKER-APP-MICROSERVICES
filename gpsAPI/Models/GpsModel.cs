using System.ComponentModel.DataAnnotations;
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
        [Required]
        public long owner { set; get; }
        [Required]
        public string status { set; get; }

    }
}