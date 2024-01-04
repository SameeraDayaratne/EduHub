using EduHub.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EduHub.Controllers
{
    [Route("api/Classrooms")]
    [ApiController]
    public class ClassroomController : Controller
    {

        private IConfiguration _configuration;

        public ClassroomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;

        [HttpGet]
        public JsonResult GetClassrooms()
        {
            List<Classroom> classrooms = new List<Classroom>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query = "SELECT * FROM Classroom";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);


            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Classroom obj = new Classroom();

                obj.ClassroomId = Convert.ToInt32(dt.Rows[i]["ClassroomId"]);
                obj.ClassName = dt.Rows[i]["ClassName"].ToString();

                classrooms.Add(obj);
            }

            _connection.Close();
            return Json(classrooms);
        }

        // POST api/<ClassroomController>
        [HttpPost]
        public ActionResult Post([FromBody] Classroom classroom)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO Classroom (ClassName)
                VALUES ('{classroom.ClassName}');
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "Classroom Created" });
        }

        // PUT api/<ClassroomController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Classroom classroom)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                UPDATE Classroom
                SET ClassName = '{classroom.ClassName}'
                WHERE ClassroomID = {id};
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Classroom Updated" });
            }
            return BadRequest(new { Message = "Classroom Not Found" });
        }

        // DELETE api/<ClassroomController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from Classroom WHERE ClassroomID = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Classroom Deleted" });
            }
            return BadRequest(new { Message = "Classroom Not Found" });
        }
    }
}
