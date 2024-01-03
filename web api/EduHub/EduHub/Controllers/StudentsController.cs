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
    public class StudentsController : Controller
    {
        private IConfiguration _configuration;
        
        public StudentsController(IConfiguration configuration)
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

            string cmd = "SELECT Students.StudentID, Students.FirstName, Students.LastName, Students.ContactPerson, Students.ContactNo, Students.EmailAddress, Students.DateOfBirth, Students.Age,  Classroom.ClassName FROM Students JOIN Classroom ON Students.ClassroomID = Classroom.ClassroomID";

            DataTable dt = new DataTable();
            _command = new SqlCommand(cmd, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var student = new
                {
                    StudentId = Convert.ToInt32(dt.Rows[i]["StudentId"]),
                    FirstName = dt.Rows[i]["FirstName"].ToString(),
                    LastName = dt.Rows[i]["LastName"].ToString(),
                    ContactPerson = dt.Rows[i]["ContactPerson"].ToString(),
                    ContactNo = Convert.ToInt64(dt.Rows[i]["ContactNo"]),
                    EmailAddress = dt.Rows[i]["EmailAddress"].ToString(),
                    DateOfBirth = Convert.ToDateTime(dt.Rows[i]["DateOfBirth"]),
                    ClassName = dt.Rows[i]["ClassName"].ToString(),
                    Age = Convert.ToInt32(dt.Rows[i]["Age"])
                };
                

                students.Add(student);
            }

            _connection.Close();
            return Json(students);



           
        }

        // POST api/<StudentsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
