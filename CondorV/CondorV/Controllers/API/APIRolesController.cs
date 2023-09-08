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
    public class APIRolesController : ControllerBase
    {
        private readonly CondorVContext _context;

        public APIRolesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: api/APIRoles
        [HttpGet]
       // [Authorize(Roles = "Admin", Policy = "LecturePermission")]
        public async Task<ActionResult<IEnumerable<Role>>> GetRole()
        {
          if (_context.Role == null)
          {
              return NotFound();
          }
            return await _context.Role.ToListAsync();
        }

        // GET: api/APIRoles/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin", Policy = "LecturePermission")]
        public async Task<ActionResult<Role>> GetRole(long id)
        {
          if (_context.Role == null)
          {
              return NotFound();
          }
            var role = await _context.Role.FindAsync(id);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // PUT: api/APIRoles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin", Policy = "ModifierPermission")]
        public async Task<IActionResult> PutRole(long id, Role role)
        {
            if (id != role.Id)
            {
                return BadRequest();
            }

            _context.Entry(role).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/APIRoles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Admin", Policy = "AjouterPermission")]
        public async Task<ActionResult<Role>> PostRole(Role role)
        {
          if (_context.Role == null)
          {
              return Problem("Entity set 'CondorVContext.Role'  is null.");
          }
            _context.Role.Add(role);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRole", new { id = role.Id }, role);
        }

        // DELETE: api/APIRoles/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin", Policy = "SupprimerPermission")]
        public async Task<IActionResult> DeleteRole(long id)
        {
            if (_context.Role == null)
            {
                return NotFound();
            }
            var role = await _context.Role.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            _context.Role.Remove(role);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleExists(long id)
        {
            return (_context.Role?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
