using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class Subject
    {
        [Key]
        public int SubjectId { get; set; }
        [Required]
        public string SubjectName { get; set; } = String.Empty;
    }
}
