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
    public class APITypeGrandeursController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APITypeGrandeursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APITypeGrandeurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeGrandeur>>> GetTypeGrandeur()
        {
          if (_context.TypeGrandeur == null)
          {
              return NotFound();
          }
            return await _context.TypeGrandeur.ToListAsync();
        }

        // GET: api/APITypeGrandeurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeGrandeur>> GetTypeGrandeur(long id)
        {
          if (_context.TypeGrandeur == null)
          {
              return NotFound();
          }
            var typeGrandeur = await _context.TypeGrandeur.FindAsync(id);

            if (typeGrandeur == null)
            {
                return NotFound();
            }

            return typeGrandeur;
        }

        // PUT: api/APITypeGrandeurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeGrandeur(long id, TypeGrandeur typeGrandeur)
        {
            if (id != typeGrandeur.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeGrandeur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeGrandeurExists(id))
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

        // POST: api/APITypeGrandeurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TypeGrandeur>> PostTypeGrandeur(TypeGrandeur typeGrandeur)
        {
          if (_context.TypeGrandeur == null)
          {
              return Problem("Entity set 'CondorVContext.TypeGrandeur'  is null.");
          }
            _context.TypeGrandeur.Add(typeGrandeur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeGrandeur", new { id = typeGrandeur.Id }, typeGrandeur);
        }

        // DELETE: api/APITypeGrandeurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypeGrandeur(long id)
        {
            if (_context.TypeGrandeur == null)
            {
                return NotFound();
            }
            var typeGrandeur = await _context.TypeGrandeur.FindAsync(id);
            if (typeGrandeur == null)
            {
                return NotFound();
            }

            _context.TypeGrandeur.Remove(typeGrandeur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TypeGrandeurExists(long id)
        {
            return (_context.TypeGrandeur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
