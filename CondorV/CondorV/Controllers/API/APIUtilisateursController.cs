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
using ApiAuthentification1.Models;
using System.Net;

namespace CondorV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIUtilisateursController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIUtilisateursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIUtilisateurs
        [HttpGet]
       // [Authorize(Roles = "AdminAG,Admin", Policy = "LecturePermission")]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateur()
        {
          if (_context.Utilisateur == null)
          {
              return NotFound();
          }
            return await _context.Utilisateur.Include(r => r.Role).ToListAsync();
        }

        // GET: api/APIUtilisateurs/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "AdminAG,Admin", Policy = "LecturePermission")]
        public async Task<ActionResult<Utilisateur>> GetUtilisateur(Guid id)
        {
          if (_context.Utilisateur == null)
          {
              return NotFound();
          }
            var utilisateur = await _context.Utilisateur.Include(r => r.Role).Include(s => s.Site).FirstOrDefaultAsync(u => u.Id ==id);


            if (utilisateur == null)
            {
                return NotFound();
            }

            return utilisateur;
        }

        // PUT: api/APIUtilisateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "AdminAG,Admin", Policy = "ModifierPermission")]
        public async Task<IActionResult> PutUtilisateur(Guid id, Utilisateur EditedUser)
        {
            if (id != EditedUser.Id)
            {
                return BadRequest();
            }
            var utilisateur = _context.Utilisateur.FirstOrDefault<Utilisateur>(obj => obj.Id == id);
            utilisateur.Nom = EditedUser.Nom;
            utilisateur.Prenom = EditedUser.Prenom;
            utilisateur.UserName = EditedUser.UserName;
            utilisateur.Email = EditedUser.Email;
            utilisateur.EstActive = EditedUser.EstActive;
            utilisateur.RoleId = EditedUser.RoleId;
            utilisateur.SiteId = EditedUser.SiteId;
            utilisateur.AgenceId = EditedUser.AgenceId;
            if (EditedUser.Password != utilisateur.Password)
            {
                utilisateur.Password = BCrypt.Net.BCrypt.HashPassword(EditedUser.Password);
            }
            _context.Entry(utilisateur).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilisateurExists(id))
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
       
        // POST: api/APIUtilisateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "AdminAG,Admin", Policy = "AjouterPermission")]
        public async Task<ActionResult<Utilisateur>> PostUtilisateur(PostUtilisateurModel PostModel)
        {

            Utilisateur newUtilisateur = new(PostModel.Nom, PostModel.Prenom, PostModel.Email, PostModel.UserName, BCrypt.Net.BCrypt.HashPassword(PostModel.Password), PostModel.EstActive, PostModel.RoleId, PostModel.SiteId, PostModel.AgenceId);
            if (newUtilisateur.SiteId == 0)
            {
                newUtilisateur.SiteId = null;
            }
            if (newUtilisateur.AgenceId == 0)
            {
                newUtilisateur.AgenceId = null;
            }
            try
            {
                _context.Utilisateur.Add(newUtilisateur);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            //return CreatedAtAction("GetUtilisateur", new { id = newUtilisateur.Id }, newUtilisateur);
            return Ok();

        }

        // DELETE: api/APIUtilisateurs/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "AdminAG,Admin", Policy = "SupprimerPermission")]
        public async Task<IActionResult> DeleteUtilisateur(Guid id)
        {
            if (_context.Utilisateur == null)
            {
                return NotFound();
            }
            var utilisateur = await _context.Utilisateur.FindAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            _context.Utilisateur.Remove(utilisateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UtilisateurExists(Guid id)
        {
            return (_context.Utilisateur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
