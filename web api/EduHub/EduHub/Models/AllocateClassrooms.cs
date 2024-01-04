using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class AllocateClassrooms
    {

        [Key]
        public int AllocateClassroomId { get; set; }

        [Required]
        public int TeacherId { get; set; }

        [Required]
        public int ClassroomId { get; set; }
    }
}
