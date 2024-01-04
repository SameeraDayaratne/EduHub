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
    public class AllocateClassroomsController : Controller
    {
        private IConfiguration _configuration;

        public AllocateClassroomsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;

        // GET api/<AllocateClassroomsController>/5
        [HttpGet]
        public JsonResult Get()
        {

            List<object> allocatedClassrooms = new List<object>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query = "SELECT AllocateClassrooms.AllocateClassroomId, Teachers.FirstName, Teachers.LastName, Classroom.ClassName FROM AllocateSubjects JOIN Teachers ON AllocateClassrooms.TeacherId = Teachers.TeacherId JOIN Subjects ON AllocateSubjects.ClassroomId = Classroom.ClassroomId";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                string FirstName = dt.Rows[i]["FirstName"].ToString();
                string LastName = dt.Rows[i]["LastName"].ToString();
                var allocatedClassroom = new
                {
                    AllocateClassroomId = Convert.ToInt32(dt.Rows[i]["AllocateClassroomId"]),
                    TeacherName = FirstName + " " + LastName,
                    ClassName = dt.Rows[i]["ClassName"].ToString(),

                };


                allocatedClassrooms.Add(allocatedClassroom);
            }

            _connection.Close();
            return Json(allocatedClassrooms);
        }

        // POST api/<AllocateClassroomsController>
        [HttpPost]
        public ActionResult Post([FromBody] AllocateClassrooms allocateClassrooms)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO AllocateClassrooms (TeacherId, ClassroomId)
                VALUES ('{allocateClassrooms.TeacherId}', '{allocateClassrooms.ClassroomId}');
            ";


            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "AllocateClassroom Created" });
        }

        // PUT api/<AllocateClassroomsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AllocateClassroomsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from AllocateClassrooms WHERE AllocateClassroomId = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "AllocateClassroom Deleted" });
            }
            return BadRequest(new { Message = "AllocateClassroom Not Found" });
        }
    }
}
