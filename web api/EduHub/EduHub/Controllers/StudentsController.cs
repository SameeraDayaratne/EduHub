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

            string query = "SELECT Students.StudentID, Students.FirstName, Students.LastName, Students.ContactPerson, Students.ContactNo, Students.EmailAddress, Students.DateOfBirth, Students.Age,  Classroom.ClassName FROM Students JOIN Classroom ON Students.ClassroomID = Classroom.ClassroomID";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DateTime DateOfBirthDT = Convert.ToDateTime(dt.Rows[i]["DateOfBirth"]);
                string formattedDate = DateOfBirthDT.ToString("yyyy/MM/dd");
                var student = new
                {
                    StudentId = Convert.ToInt32(dt.Rows[i]["StudentId"]),
                    FirstName = dt.Rows[i]["FirstName"].ToString(),
                    LastName = dt.Rows[i]["LastName"].ToString(),
                    ContactPerson = dt.Rows[i]["ContactPerson"].ToString(),
                    ContactNo = Convert.ToInt64(dt.Rows[i]["ContactNo"]),
                    EmailAddress = dt.Rows[i]["EmailAddress"].ToString(),
                    DateOfBirth = formattedDate,
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
        public ActionResult CreateStudent([FromBody] Student student)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO Students (FirstName, LastName, ContactPerson, ContactNo, EmailAddress, DateOfBirth, Age, ClassroomId)
                VALUES ('{student.FirstName}', '{student.LastName}', '{student.ContactPerson}', '{student.ContactNo}', '{student.EmailAddress}', '{student.DateOfBirth}', {student.Age}, {student.ClassroomId});
            ";


            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "Student Created"});
        }

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Student student)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                UPDATE Students
                SET FirstName = '{student.FirstName}',
                    LastName = '{student.LastName}',
                    ContactPerson = '{student.ContactPerson}',
                    ContactNo = '{student.ContactNo}',
                    EmailAddress = '{student.EmailAddress}',
                    DateOfBirth = '{student.DateOfBirth}',
                    Age = {student.Age},
                    ClassroomId = {student.ClassroomId}
                WHERE StudentId = {id};
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if(x > 0)
            {
                return Ok(new { Message = "Student Updated" });
            }
            return BadRequest(new { Message = "Student Not Found" });

        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from Students WHERE StudentId = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Student Deleted" });
            }
            return BadRequest(new { Message = "Student Not Found" });
        }
    }
}
