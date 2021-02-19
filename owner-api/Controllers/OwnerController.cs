using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using owner_api.Models;
using Microsoft.AspNetCore.Cors;


namespace owner_api.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly OwnerContext _context;

        public OwnerController(OwnerContext context)
        {
            _context = context;
        }

        // GET /api/oner
        [HttpGet]
        public ActionResult<IEnumerable<Owner>> GetOwnerItems()
        {
            return _context.OwnerItems;
        }

        [HttpGet("{id}")]
        public ActionResult<Owner> GetOwnerItem(long id)
        {
            var owner = _context.OwnerItems.Find(id);

            if (owner == null)
            {
                return NotFound();
            }
            return owner;
        }

        [HttpPost]
        public ActionResult<Owner> PostOwnerItem(Owner owner)
        {
            if (ModelState.IsValid)
            {
                _context.OwnerItems.Add(owner);
                _context.SaveChanges();

                return CreatedAtAction("GetOwnerItem", new Owner { id = owner.id }, owner);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public ActionResult<Owner> PutOwnerItem(long id, Owner owner)
        {

            if (id != owner.id)
            {
                return BadRequest();
            }

            else if (ModelState.IsValid)
            {
                _context.Entry(owner).State = EntityState.Modified;
                _context.SaveChanges();

                return owner;
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Owner> DeleteOwner(long id)
        {
            var ownerItem = _context.OwnerItems.Find(id);

            if (ownerItem == null)
            {
                return NotFound();
            }

            _context.OwnerItems.Remove(ownerItem);
            _context.SaveChanges();
            return ownerItem;
        }


    }
}