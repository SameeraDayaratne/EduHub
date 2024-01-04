using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class Teacher
    {
        [Key]
        public int TeacherId { get; set; }
        [Required]
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        [Required]
        public int ContactNo { get; set; }
        [Required]
        public string EmailAddress { get; set; } = String.Empty;
    }
}
