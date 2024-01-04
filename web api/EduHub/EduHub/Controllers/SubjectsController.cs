using EduHub.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using System.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EduHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : Controller
    {
        private IConfiguration _configuration;

        public SubjectsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;



        [HttpGet]
        public JsonResult Get(int id)
        {
            List<Subject> subjects = new List<Subject>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = "SELECT * FROM Subjects";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);


            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Subject obj = new Subject();

                obj.SubjectId = Convert.ToInt32(dt.Rows[i]["SubjectId"]);
                obj.SubjectName = dt.Rows[i]["SubjectName"].ToString();

                subjects.Add(obj);
            }

            _connection.Close();
            return Json(subjects);
        }

        // POST api/<SubjectsController>
        [HttpPost]
        public ActionResult Post([FromBody] Subject subject)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO Subjects (SubjectName)
                VALUES ('{subject.SubjectName}');
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "Subject Created" });
        }

        // PUT api/<SubjectsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Subject subject)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                UPDATE Subjects
                SET SubjectName = '{subject.SubjectName}'
                WHERE SubjectId = {id};
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Subject Updated" });
            }
            return BadRequest(new { Message = "Subject Not Found" });
        }

        // DELETE api/<SubjectsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from Subjects WHERE SubjectId = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Subject Deleted" });
            }
            return BadRequest(new { Message = "Subject Not Found" });
        }
    }
}
