using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CondorV.Data;
using CondorV.Models.BD;

namespace CondorV.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIGrandeursController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIGrandeursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIGrandeurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grandeur>>> GetGrandeur()
        {
            if (_context.Grandeur == null)
            {
                return NotFound();
            }
            return await _context.Grandeur.Include(t => t.TypeGrandeur).ToListAsync();
        }

        // GET: api/APIGrandeurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grandeur>> GetGrandeur(long id)
        {
            if (_context.Grandeur == null)
            {
                return NotFound();
            }
            var grandeur = await _context.Grandeur.FindAsync(id);

            if (grandeur == null)
            {
                return NotFound();
            }

            return grandeur;
        }

        // PUT: api/APIGrandeurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrandeur(long id, Grandeur grandeur)
        {
            if (id != grandeur.Id)
            {
                return BadRequest();
            }

            _context.Entry(grandeur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GrandeurExists(id))
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

        // POST: api/APIGrandeurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Grandeur>> PostGrandeur(Grandeur grandeur)
        {
            if (_context.Grandeur == null)
            {
                return Problem("Entity set 'CondorVContext.Grandeur'  is null.");
            }
            _context.Grandeur.Add(grandeur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGrandeur", new { id = grandeur.Id }, grandeur);
        }

        // DELETE: api/APIGrandeurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrandeur(long id)
        {
            if (_context.Grandeur == null)
            {
                return NotFound();
            }
            var grandeur = await _context.Grandeur.FindAsync(id);
            if (grandeur == null)
            {
                return NotFound();
            }

            _context.Grandeur.Remove(grandeur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GrandeurExists(long id)
        {
            return (_context.Grandeur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
