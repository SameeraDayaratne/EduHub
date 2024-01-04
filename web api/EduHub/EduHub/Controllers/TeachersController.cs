using Microsoft.AspNetCore.Mvc;
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
    public class TeachersController : Controller
    {
        private IConfiguration _configuration;

        public TeachersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        SqlConnection _connection;
        SqlCommand _command;

        [HttpGet]
        public JsonResult Get(int id)
        {
            List<Teacher> teachers = new List<Teacher>();
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));

            string query = "SELECT * FROM Teachers";

            DataTable dt = new DataTable();
            _command = new SqlCommand(query, _connection);
            _connection.Open();

            SqlDataAdapter adapter = new SqlDataAdapter(_command);
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Teacher obj = new Teacher();

                obj.TeacherId = Convert.ToInt32(dt.Rows[i]["TeacherId"]);
                obj.FirstName = dt.Rows[i]["FirstName"].ToString();
                obj.LastName = dt.Rows[i]["LastName"].ToString();
                obj.ContactNo = Convert.ToInt32(dt.Rows[i]["ContactNo"]);
                obj.EmailAddress = dt.Rows[i]["EmailAddress"].ToString();

                teachers.Add(obj);
            }

            _connection.Close();
            return Json(teachers);
        }

        // POST api/<TeachersController>
        [HttpPost]
        public ActionResult Post([FromBody] Teacher teacher)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                INSERT INTO Teachers (FirstName, LastName, ContactNo, EmailAddress)
                VALUES ('{teacher.FirstName}', '{teacher.LastName}', '{teacher.ContactNo}', '{teacher.EmailAddress}');
            ";


            _command = new SqlCommand(query, _connection);
            _connection.Open();
            _command.ExecuteNonQuery();
            _connection.Close();


            return Ok(new { Message = "Teacher Created" });
        }

        // PUT api/<TeachersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Teacher teacher)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                UPDATE Teachers
                SET FirstName = '{teacher.FirstName}',
                    LastName = '{teacher.LastName}',
                    ContactNo = '{teacher.ContactNo}',
                    EmailAddress = '{teacher.EmailAddress}'
                   
                WHERE TeacherId = {id};
            ";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Teacher Updated" });
            }
            return BadRequest(new { Message = "Teacher Not Found" });
        }

        // DELETE api/<TeachersController>/5
        [HttpDelete("{id}")]
        public ActionResult ActionResult(int id)
        {
            _connection = new SqlConnection(this._configuration.GetConnectionString("DefaultConnection"));
            string query = $@"
                DELETE from Teachers WHERE TeacherId = {id}";

            _command = new SqlCommand(query, _connection);
            _connection.Open();
            int x = _command.ExecuteNonQuery();
            if (x > 0)
            {
                return Ok(new { Message = "Teacher Deleted" });
            }
            return BadRequest(new { Message = "Teacher Not Found" });
        }
    }
}
