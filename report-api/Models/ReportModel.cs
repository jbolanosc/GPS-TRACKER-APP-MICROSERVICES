using System.ComponentModel.DataAnnotations;
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
        public long gps { get; set; }
        [Required]
        public long owner { get; set; }
    }
}