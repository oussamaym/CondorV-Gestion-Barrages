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
    public class APIAgencesController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIAgencesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIAgences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agence>>> GetAgence()
        {
          if (_context.Agence == null)
          {
              return NotFound();
          }
            var agencesetbarrages = await _context.Agence
          .Include(a => a.Barrages).Include(a => a.Utilisateurs)
          .ToListAsync();
            return agencesetbarrages;
        }

        // GET: api/APIAgences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agence>> GetAgence(long id)
        {
          if (_context.Agence == null)
          {
              return NotFound();
          }
            var agence = await _context.Agence.FindAsync(id);

            if (agence == null)
            {
                return NotFound();
            }

            return agence;
        }

        // PUT: api/APIAgences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgence(long id, Agence agence)
        {
            if (id != agence.Id)
            {
                return BadRequest();
            }

            _context.Entry(agence).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgenceExists(id))
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

        // POST: api/APIAgences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Agence>> PostAgence(Agence agence)
        {
          if (_context.Agence == null)
          {
              return Problem("Entity set 'CondorVContext.Agence'  is null.");
          }
            _context.Agence.Add(agence);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgence", new { id = agence.Id }, agence);
        }

        // DELETE: api/APIAgences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgence(long id)
        {
            if (_context.Agence == null)
            {
                return NotFound();
            }
            var agence = await _context.Agence.FindAsync(id);
            if (agence == null)
            {
                return NotFound();
            }

            _context.Agence.Remove(agence);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AgenceExists(long id)
        {
            return (_context.Agence?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
