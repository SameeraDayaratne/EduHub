using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
using EduHub.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EduHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailReportController : Controller
    {
        private IConfiguration _configuration;

        public StudentDetailReportController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;

        [HttpGet]
        public JsonResult GetStudents()
        {
            List<object> students = new List<object>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query = "SELECT StudentId, FirstName, LastName FROM Students";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                string FirstName = dt.Rows[i]["FirstName"].ToString();
                string LastName = dt.Rows[i]["LastName"].ToString(); 
                var student = new
                {
                    StudentId = Convert.ToInt32(dt.Rows[i]["StudentId"]),
                    Name = FirstName + " " + LastName,
                };


                students.Add(student);
            }

            _connection.Close();
            return Json(students);
        }

        // GET api/<StudentDetailReportController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            List<object> studentDetails = new List<object>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query1 = $@"SELECT st.ContactPerson, st.ContactNo , st.DateOfBirth, st.EmailAddress , cl.ClassName FROM Students as st , Classroom as cl WHERE st.ClassroomID = cl.ClassroomID AND st.StudentId = {id}";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query1, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            if(dt.Rows.Count > 0)
            {
                DataRow dr = dt.Rows[0];
                DateTime DateOfBirthDT = Convert.ToDateTime(dr["DateOfBirth"]);
                string formattedDate = DateOfBirthDT.ToString("yyyy/MM/dd");
                var personalDetails = new
                {
                    ContactPerson = dr["ContactPerson"].ToString(),
                    ContactNo = Convert.ToInt64(dr["ContactNo"]),
                    DateOfBirth = formattedDate,
                    EmailAddress = dr["EmailAddress"].ToString(),
                    ClassName = dr["ClassName"].ToString(),

                };

                studentDetails.Add(personalDetails);
            }

            string query2 = $@"SELECT  t.FirstName, t.LastName , sub.SubjectName   FROM Students as st , Classroom as cl , Teachers as t, Subjects as sub , AllocateClassrooms ,AllocateSubjects WHERE st.ClassroomID = cl.ClassroomID AND cl.ClassroomID = AllocateClassrooms.ClassroomId And AllocateClassrooms.TeacherId = t.TeacherId AND t.TeacherId = AllocateSubjects.TeacherId AND AllocateSubjects.SubjectId = sub.SubjectId AND st.StudentID = {id}";
            DataTable dt2 = new DataTable();
            _command = new SqlCommand(query2, _connection);
            
            SqlDataAdapter adapter2 = new SqlDataAdapter(_command);
            adapter2.Fill(dt2);

            for (int i = 0; i < dt2.Rows.Count; i++)
            {
                string FirstName = dt2.Rows[i]["FirstName"].ToString();
                string LastName = dt2.Rows[i]["LastName"].ToString();
                var otherDetails = new
                {
                    Name = FirstName + " " + LastName,
                    SubjectName = dt2.Rows[i]["SubjectName"].ToString(),
                };


                studentDetails.Add(otherDetails);
            }

            _connection.Close();
            return Json(studentDetails);

        }

    }
}
