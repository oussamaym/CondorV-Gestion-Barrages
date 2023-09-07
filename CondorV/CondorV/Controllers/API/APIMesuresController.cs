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
    public class APIMesuresController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIMesuresController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIMesures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mesure>>> GetMesure()
        {
          if (_context.Mesure == null)
          {
              return NotFound();
          }
            return await _context.Mesure.ToListAsync();
        }

        // GET: api/APIMesures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mesure>> GetMesure(long id)
        {
          if (_context.Mesure == null)
          {
              return NotFound();
          }
            var mesure = await _context.Mesure.FindAsync(id);

            if (mesure == null)
            {
                return NotFound();
            }

            return mesure;
        }

        // PUT: api/APIMesures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMesure(long id, Mesure mesure)
        {
            if (id != mesure.Id)
            {
                return BadRequest();
            }

            _context.Entry(mesure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MesureExists(id))
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

        // POST: api/APIMesures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mesure>> PostMesure(Mesure mesure)
        {
          if (_context.Mesure == null)
          {
              return Problem("Entity set 'CondorVContext.Mesure'  is null.");
          }
            _context.Mesure.Add(mesure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMesure", new { id = mesure.Id }, mesure);
        }

        // DELETE: api/APIMesures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMesure(long id)
        {
            if (_context.Mesure == null)
            {
                return NotFound();
            }
            var mesure = await _context.Mesure.FindAsync(id);
            if (mesure == null)
            {
                return NotFound();
            }

            _context.Mesure.Remove(mesure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MesureExists(long id)
        {
            return (_context.Mesure?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
