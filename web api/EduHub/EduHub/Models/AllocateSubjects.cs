using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EduHub.Models
{
    public class AllocateSubjects
    {
        [Key]
        public int AllocateSubjectID { get; set; }

        [Required]
        public int TeacherId { get; set; }

        [Required]
        public int SubjectId { get; set; }

    }
}
