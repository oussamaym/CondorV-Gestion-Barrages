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
    public class APISitesGrandeursController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APISitesGrandeursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APISitesGrandeurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SitesGrandeurs>>> GetSitesGrandeurs()
        {
          if (_context.SitesGrandeurs == null)
          {
              return NotFound();
          }
            return await _context.SitesGrandeurs.Include(s => s.Site).Include(t => t.TypeGrandeur).ToListAsync();
        }

        // GET: api/APISitesGrandeurs/5

        // GET: api/APISitesGrandeurs/5/10
        [HttpGet("{siteId}/{typeGrandeurId}")]
        public async Task<ActionResult<SitesGrandeurs>> GetSitesGrandeurs(long siteId, long typeGrandeurId)
        {
            if (_context.SitesGrandeurs == null)
            {
                return NotFound();
            }

            var sitesGrandeurs = await _context.SitesGrandeurs
       .Where(sg => sg.SiteId == siteId && sg.TypeGrandeurId == typeGrandeurId)
       .Include(t => t.TypeGrandeur)
       .FirstOrDefaultAsync();

            if (sitesGrandeurs == null)
            {
                return NotFound();
            }

            return sitesGrandeurs;
        }

        // GET: api/APISitesGrandeurs/BySiteId/5
        [HttpGet("BySiteId/{siteId}")]
        public async Task<ActionResult<IEnumerable<SitesGrandeurs>>> GetSitesGrandeursBySiteId(long siteId)
        {
            if (_context.SitesGrandeurs == null)
            {
                return NotFound();
            }

            var sitesGrandeurs = await _context.SitesGrandeurs.Include(t => t.TypeGrandeur)
                .Where(sg => sg.SiteId == siteId)
                .ToListAsync();

            if (!sitesGrandeurs.Any())
            {
                return NotFound();
            }

            return sitesGrandeurs;
        }

        // GET: api/APISitesGrandeurs/ByTypeGrandeurId/10
        [HttpGet("ByTypeGrandeurId/{typeGrandeurId}")]
        public async Task<ActionResult<IEnumerable<SitesGrandeurs>>> GetSitesGrandeursByTypeGrandeurId(long typeGrandeurId)
        {
            if (_context.SitesGrandeurs == null)
            {
                return NotFound();
            }

            var sitesGrandeurs = await _context.SitesGrandeurs
                .Where(sg => sg.TypeGrandeurId == typeGrandeurId)
                .ToListAsync();

            if (!sitesGrandeurs.Any())
            {
                return NotFound();
            }

            return sitesGrandeurs;
        }

        // PUT: api/APISitesGrandeurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSitesGrandeurs(long id, SitesGrandeurs sitesGrandeurs)
        {
            if (id != sitesGrandeurs.SiteId)
            {
                return BadRequest();
            }

            _context.Entry(sitesGrandeurs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SitesGrandeursExists(id))
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

        // POST: api/APISitesGrandeurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SitesGrandeurs>> PostSitesGrandeurs(SitesGrandeurs sitesGrandeurs)
        {
          if (_context.SitesGrandeurs == null)
          {
              return Problem("Entity set 'CondorVContext.SitesGrandeurs'  is null.");
          }
            _context.SitesGrandeurs.Add(sitesGrandeurs);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SitesGrandeursExists(sitesGrandeurs.SiteId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSitesGrandeurs", new { id = sitesGrandeurs.SiteId }, sitesGrandeurs);
        }

        // DELETE: api/APISitesGrandeurs/5
        [HttpDelete("{siteId}/{typeGrandeurId}")]
        public async Task<IActionResult> DeleteSitesGrandeurs(long siteId, long typeGrandeurId)
        {
            var sitesGrandeurs = await _context.SitesGrandeurs
                .Where(sg => sg.SiteId == siteId && sg.TypeGrandeurId == typeGrandeurId)
                .FirstOrDefaultAsync();

            if (sitesGrandeurs == null)
            {
                return NotFound();
            }

            _context.SitesGrandeurs.Remove(sitesGrandeurs);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool SitesGrandeursExists(long id)
        {
            return (_context.SitesGrandeurs?.Any(e => e.SiteId == id)).GetValueOrDefault();
        }
    }
}
