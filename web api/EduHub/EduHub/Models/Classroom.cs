using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class Classroom
    {
        [Key]
        public int ClassroomId { get; set; }
        [Required]
        public string ClassName { get; set; } = String.Empty;
    }
}
