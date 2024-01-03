using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }
        [Required]
        public string FirstName { get; set; } = String.Empty;
        [Required]
        public string LastName { get; set; } = String.Empty;
        [Required]
        public string ContactPerson { get; set; } = String.Empty;
        [Required]
        public int ContactNo { get; set; }
        [Required]
        public string EmailAddress { get; set; } = String.Empty;
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public int ClassroomId { get; set; }
        [Required]
        public int Age { get; set; }

    }
}
