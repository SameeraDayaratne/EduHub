using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
using EduHub.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace EduHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllocateSubjectsController : Controller
    {
        private IConfiguration _configuration;

        public AllocateSubjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;


        // GET api/<AllocateSubjectsController>/5
        [HttpGet]
        public JsonResult Get()
        {

            List<object> allocatedSubjects = new List<object>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query = "SELECT AllocateSubjects.AllocateSubjectId, Teachers.FirstName, Teachers.LastName, Subjects.SubjectName FROM AllocateSubjects JOIN Teachers ON AllocateSubjects.TeacherId = Teachers.TeacherId JOIN Subjects ON AllocateSubjects.SubjectId = Subjects.SubjectId";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                string FirstName = dt.Rows[i]["FirstName"].ToString();
                string LastName = dt.Rows[i]["LastName"].ToString();
                var allocatedSubject = new
                {
                    AllocateSubjectId = Convert.ToInt32(dt.Rows[i]["AllocateSubjectId"]),
                    TeacherName = FirstName + " " + LastName,
                    SubjectName = dt.Rows[i]["SubjectName"].ToString(),
                    
                };


                allocatedSubjects.Add(allocatedSubject);
            }

            _connection.Close();
            return Json(allocatedSubjects);
        }

        // POST api/<AllocateSubjectsController>
        [HttpPost]
        public ActionResult Post([FromBody] AllocateSubjects allocateSubjects)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO AllocateSubjects (TeacherId, SubjectId)
                VALUES ('{allocateSubjects.TeacherId}', '{allocateSubjects.SubjectId}');
            ";


            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "AllocateSubject Created" });
        }

        // PUT api/<AllocateSubjectsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AllocateSubjectsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from AllocateSubjects WHERE AllocateSubjectId = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "AllocateSubject Deleted" });
            }
            return BadRequest(new { Message = "AllocateSubject Not Found" });
        }
    }
}
