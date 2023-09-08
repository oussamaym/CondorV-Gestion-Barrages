using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CondorV.Data;
using CondorV.Models.BD;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace CondorV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APISitesController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APISitesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APISites
        [HttpGet]

    
        public async Task<ActionResult<IEnumerable<Site>>> GetSite()
        {
          if (_context.Site == null)
          {
              return NotFound();
          }
            var sites = _context.Site.Include(u => u.Utilisateurs).Include(a => a.Agence);
            return await sites.ToListAsync();
        }

        // GET: api/APISites/5
        [HttpGet("{id}")]

        //[Authorize(Roles = "AdminBAR,AdminAG,Admin", Policy = "LecturePermission")]

        public async Task<ActionResult<Site>> GetSite(long id)
        {
          if (_context.Site == null)
          {
              return NotFound();
          }
            var site = await _context.Site.Include(a => a.Agence).FirstOrDefaultAsync(s=> s.Id == id); ;

            if (site == null)
            {
                return NotFound();
            }

            return site;
        }

        // PUT: api/APISites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "AdminBAR,AdminAG,Admin", Policy = "ModifierPermission")]
        public async Task<IActionResult> PutSite(long id, Site site)
        {
            if (id != site.Id)
            {
                return BadRequest();
            }

            _context.Entry(site).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SiteExists(id))
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

        // POST: api/APISites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]


        //[Authorize(Roles = "AdminBAR,AdminAG,Admin", Policy = "AjouterPermission")]

        public async Task<ActionResult<Site>> PostSite(Site site)
        {
          if (_context.Site == null)
          {
              return Problem("Entity set 'CondorVContext.Site'  is null.");
          }
            _context.Site.Add(site);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSite", new { id = site.Id }, site);
        }

        // DELETE: api/APISites/5
        [HttpDelete("{id}")]


        //[Authorize(Roles = "AdminBAR,AdminAG,Admin", Policy = "SupprimerPermission")]
        public async Task<IActionResult> DeleteSite(long id)
        {
            var site = await _context.Site.FindAsync(id);
            if (site == null)
            {
                return NotFound();
            }

            // Find the associated sites and set their agency ID to NULL
            var associatedGrandeurs = _context.Grandeur.Where(s => s.SiteId == id);
            var associatedUsers = _context.Utilisateur.Where(u => u.SiteId == id);

            foreach (var grandeur in associatedGrandeurs)
            {
                grandeur.SiteId = null; // Set the agency ID to NULL
            }
            foreach (var user in associatedUsers)
            {
                user.SiteId = null; // Set the agency ID to NULL
            }

            _context.Site.Remove(site);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SiteExists(long id)
        {
            return (_context.Site?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
