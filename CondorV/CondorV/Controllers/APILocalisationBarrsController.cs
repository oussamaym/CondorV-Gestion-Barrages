using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CondorV.Data;
using CondorV.Models.BD;

namespace CondorV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APILocalisationBarrsController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APILocalisationBarrsController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APILocalisationBarrs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocalisationBarr>>> GetLocalisationBarr()
        {
          if (_context.LocalisationBarr == null)
          {
              return NotFound();
          }
            return await _context.LocalisationBarr.ToListAsync();
        }

        // GET: api/APILocalisationBarrs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocalisationBarr>> GetLocalisationBarr(int id)
        {
          if (_context.LocalisationBarr == null)
          {
              return NotFound();
          }
            var localisationBarr = await _context.LocalisationBarr.FindAsync(id);

            if (localisationBarr == null)
            {
                return NotFound();
            }

            return localisationBarr;
        }

        // PUT: api/APILocalisationBarrs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocalisationBarr(int id, LocalisationBarr localisationBarr)
        {
            if (id != localisationBarr.Id)
            {
                return BadRequest();
            }

            _context.Entry(localisationBarr).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalisationBarrExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/APILocalisationBarrs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocalisationBarr>> PostLocalisationBarr(LocalisationBarr localisationBarr)
        {
          if (_context.LocalisationBarr == null)
          {
              return Problem("Entity set 'CondorVContext.LocalisationBarr'  is null.");
          }
            _context.LocalisationBarr.Add(localisationBarr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocalisationBarr", new { id = localisationBarr.Id }, localisationBarr);
        }

        // DELETE: api/APILocalisationBarrs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocalisationBarr(int id)
        {
            if (_context.LocalisationBarr == null)
            {
                return NotFound();
            }
            var localisationBarr = await _context.LocalisationBarr.FindAsync(id);
            if (localisationBarr == null)
            {
                return NotFound();
            }

            _context.LocalisationBarr.Remove(localisationBarr);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocalisationBarrExists(int id)
        {
            return (_context.LocalisationBarr?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
