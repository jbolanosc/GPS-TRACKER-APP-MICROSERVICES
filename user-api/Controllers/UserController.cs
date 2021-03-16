using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using user_api.Models;
using BC = BCrypt.Net.BCrypt;


namespace user_api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }

        // GET /api/report
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUserItems()
        {
            return _context.UserItems;
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserItem(long id)
        {
            var user = _context.UserItems.Find(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public ActionResult<User> PostUserItem(User user)
        {
            if (ModelState.IsValid)
            {
                var email = _context.UserItems.FirstOrDefault(u => u.email == user.email);
                if (email == null)
                {
                    user.createdAt = DateTime.Now;
                    user.password = BC.HashPassword(user.password);
                    _context.UserItems.Add(user);
                    _context.SaveChanges();

                    return CreatedAtAction("GetUserItem", new User { id = user.id }, user);
                }

                return BadRequest("Email is already in use");
            }



            return BadRequest();
        }

        [HttpPut("{id}")]
        public ActionResult PutUserItem(long id, User user)
        {

            if (id != user.id)
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                user.updatedAt = DateTime.Now;
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();

                return Ok();
            }
            return NotFound();

        }

        [HttpDelete("{id}")]
        public ActionResult<User> DeleteUser(long id)
        {
            var userItem = _context.UserItems.Find(id);

            if (userItem == null)
            {
                return NotFound();
            }

            _context.UserItems.Remove(userItem);
            _context.SaveChanges();
            return userItem;
        }

        [HttpPost("login")]
        public ActionResult<User> Login(User user)
        {
            if (user.email != null && user.password != null)
            {
                var userExists = _context.UserItems.FirstOrDefault(u => u.email == user.email);
                if (userExists != null)
                {
                    if (BC.Verify(user.password, userExists.password))
                    {
                        return userExists;
                    }
                    return BadRequest("Incorrect email or password");
                }
                return NotFound("Incorrect email or password");
            }
            return BadRequest("Invalid fields");
        }
    }
}