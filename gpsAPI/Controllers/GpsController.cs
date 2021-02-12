using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using gpsAPI.Models;


namespace gpsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GpsController : ControllerBase
    {
        private readonly GpsContext _context;

        public GpsController(GpsContext context)
        {
            _context = context;
        }

        // GET /api/gps
        [HttpGet]
        public ActionResult<IEnumerable<Gps>> GetGpsItems()
        {
            return Ok(_context.GpsItems);
        }

        [HttpGet("{id}")]
        public ActionResult<Gps> GetGpsItem(long id)
        {
            var gps = _context.GpsItems.Find(id);

            if (gps == null)
            {
                return NotFound();
            }
            return Ok(gps);
        }

        [HttpPost]
        public ActionResult<Gps> PostGpsItem(Gps gps)
        {
            if (ModelState.IsValid)
            {
                System.Console.WriteLine(gps);

                _context.GpsItems.Add(gps);
                _context.SaveChanges();

                return CreatedAtAction("GetGpsItem", new Gps { id = gps.id }, gps);
            }
            return BadRequest("INVALID BODY");

        }

        [HttpPut("{id}")]
        public ActionResult<Gps> PutGpsItem(long id, Gps gps)
        {
            if (ModelState.IsValid)
            {
                if (id != gps.id)
                {
                    return BadRequest();
                }

                _context.Entry(gps).State = EntityState.Modified;
                _context.SaveChanges();

                return Ok("Updated...");
            }
            return BadRequest("INVALID BODY");
        }

        [HttpDelete("{id}")]
        public ActionResult<Gps> DeleteGps(long id)
        {
            var gpsItem = _context.GpsItems.Find(id);

            if (gpsItem == null)
            {
                return NotFound();
            }

            _context.GpsItems.Remove(gpsItem);
            _context.SaveChanges();
            return gpsItem;
        }


    }
}