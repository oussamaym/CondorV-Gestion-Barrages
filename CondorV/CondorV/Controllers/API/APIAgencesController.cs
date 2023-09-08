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

namespace CondorV.Controllers.API
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
        //[Authorize(Roles = "AdminAG,Admin", Policy = "LecturePermission")]
        public async Task<ActionResult<IEnumerable<Agence>>> GetAgence()
        {
            if (_context.Agence == null)
            {
                return NotFound();
            }
            var agences = _context.Agence.Include(s => s.Sites).Include(u => u.Utilisateurs);
            return await _context.Agence.ToListAsync();
        }

        // GET: api/APIAgences/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "AdminAG,Admin", Policy = "LecturePermission")]
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
        //[Authorize(Roles = "AdminAG,Admin", Policy = "ModifierPermission")]

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

        //[Authorize(Roles = "AdminAG,Admin", Policy = "AjouterPermission")]
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


       //[Authorize(Roles = "AdminAG,Admin", Policy = "SupprimerPermission")]

        public async Task<IActionResult> DeleteAgence(long id)
        {
            var agence = await _context.Agence.FindAsync(id);
            if (agence == null)
            {
                return NotFound();
            }

            // Find the associated sites and set their agency ID to NULL
            var associatedSites = _context.Site.Where(s => s.AgenceId == id);
            var associatedUsers= _context.Utilisateur.Where(u => u.AgenceId == id);

            foreach (var site in associatedSites)
            {
                site.AgenceId = null; // Set the agency ID to NULL
            }
            foreach (var user in associatedUsers)
            {
                user.AgenceId = null; // Set the agency ID to NULL
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
