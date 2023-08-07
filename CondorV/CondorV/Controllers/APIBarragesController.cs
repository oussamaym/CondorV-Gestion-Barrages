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
    public class APIBarragesController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIBarragesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIBarrages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Barrage>>> GetBarrage()
        {
          if (_context.Barrage == null)
          {
              return NotFound();
          }
            return await _context.Barrage.ToListAsync();
        }

        // GET: api/APIBarrages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Barrage>> GetBarrage(long id)
        {
          if (_context.Barrage == null)
          {
              return NotFound();
          }
            var barrage = await _context.Barrage.FindAsync(id);

            if (barrage == null)
            {
                return NotFound();
            }

            return barrage;
        }

        // PUT: api/APIBarrages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBarrage(long id, Barrage barrage)
        {
            if (id != barrage.Id)
            {
                return BadRequest();
            }

            _context.Entry(barrage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BarrageExists(id))
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

        // POST: api/APIBarrages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Barrage>> PostBarrage(Barrage barrage)
        {
          if (_context.Barrage == null)
          {
              return Problem("Entity set 'CondorVContext.Barrage'  is null.");
          }
            _context.Barrage.Add(barrage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBarrage", new { id = barrage.Id }, barrage);
        }

        // DELETE: api/APIBarrages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBarrage(long id)
        {
            if (_context.Barrage == null)
            {
                return NotFound();
            }
            var barrage = await _context.Barrage.FindAsync(id);
            if (barrage == null)
            {
                return NotFound();
            }

            _context.Barrage.Remove(barrage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BarrageExists(long id)
        {
            return (_context.Barrage?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
