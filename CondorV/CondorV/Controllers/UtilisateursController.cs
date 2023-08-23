using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CondorV.Data;
using CondorV.Models.BD;
using Microsoft.Win32;

namespace CondorV.Controllers
{
    public class UtilisateursController : Controller
    {
        private readonly CondorVContext _context;

        public UtilisateursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: Utilisateurs
        public async Task<IActionResult> Index()
        {
            var condorVContext = _context.Utilisateur.Include(u => u.Agence).Include(u => u.Role).Include(u => u.Site);
            return View(await condorVContext.ToListAsync());
        }

        // GET: Utilisateurs/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null || _context.Utilisateur == null)
            {
                return NotFound();
            }

            var utilisateur = await _context.Utilisateur
                .Include(u => u.Agence)
                .Include(u => u.Role)
                .Include(u => u.Site)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            return View(utilisateur);
        }

        // GET: Utilisateurs/Create
        public IActionResult Create()
        {
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Nom");
            ViewData["RoleId"] = new SelectList(_context.Role, "Id", "Designation");
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Nom");
            return View();
        }

        // POST: Utilisateurs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Prenom,UserName,Email,Password,DateCreation,EstActive,RoleId,SiteId,AgenceId")] Utilisateur utilisateur)
        {
            if (ModelState.IsValid)
            {
                if (utilisateur.SiteId == 0)
                {
                    utilisateur.SiteId = null;
                }
                if (utilisateur.AgenceId == 0)
                {
                    utilisateur.AgenceId = null;
                }
                utilisateur.Id = Guid.NewGuid();
                utilisateur.Password = BCrypt.Net.BCrypt.HashPassword(utilisateur.Password);
                _context.Add(utilisateur);   
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Nom", utilisateur.AgenceId);
            ViewData["RoleId"] = new SelectList(_context.Role, "Id", "Designation", utilisateur.RoleId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Nom", utilisateur.SiteId);
            return View(utilisateur);
        }

        // GET: Utilisateurs/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null || _context.Utilisateur == null)
            {
                return NotFound();
            }

            var utilisateur = await _context.Utilisateur.FindAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Nom", utilisateur.AgenceId);
            ViewData["RoleId"] = new SelectList(_context.Role, "Id", "Designation", utilisateur.RoleId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Nom", utilisateur.SiteId);
            return View(utilisateur);
        }

        // POST: Utilisateurs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Nom,Prenom,UserName,Email,Password,DateCreation,EstActive,RoleId,SiteId,AgenceId")] Utilisateur utilisateur)
        {
            if (id != utilisateur.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (utilisateur.SiteId == 0)
                    {
                        utilisateur.SiteId = null;
                    }
                    if (utilisateur.AgenceId == 0)
                    {
                        utilisateur.AgenceId = null;
                    }
                    utilisateur.Password = BCrypt.Net.BCrypt.HashPassword(utilisateur.Password);
                    _context.Update(utilisateur);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UtilisateurExists(utilisateur.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Id", utilisateur.AgenceId);
            ViewData["RoleId"] = new SelectList(_context.Role, "Id", "Id", utilisateur.RoleId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Id", utilisateur.SiteId);
            return View(utilisateur);
        }

        // GET: Utilisateurs/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null || _context.Utilisateur == null)
            {
                return NotFound();
            }

            var utilisateur = await _context.Utilisateur
                .Include(u => u.Agence)
                .Include(u => u.Role)
                .Include(u => u.Site)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            return View(utilisateur);
        }

        // POST: Utilisateurs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            if (_context.Utilisateur == null)
            {
                return Problem("Entity set 'CondorVContext.Utilisateur'  is null.");
            }
            var utilisateur = await _context.Utilisateur.FindAsync(id);
            if (utilisateur != null)
            {
                _context.Utilisateur.Remove(utilisateur);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UtilisateurExists(Guid id)
        {
          return (_context.Utilisateur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
