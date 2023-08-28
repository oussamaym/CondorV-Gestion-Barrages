using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CondorV.Data;
using CondorV.Models.BD;

namespace CondorV.Controllers
{
    public class SitesController : Controller
    {
        private readonly CondorVContext _context;

        public SitesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: Sites
        public async Task<IActionResult> Index()
        {
            var condorVContext = _context.Site.Include(s => s.Agence).Include(s => s.LocalisationBarr);
            return View(await condorVContext.ToListAsync());
        }

        // GET: Sites/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null || _context.Site == null)
            {
                return NotFound();
            }

            var site = await _context.Site
                .Include(s => s.Agence)
                .Include(s => s.LocalisationBarr)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (site == null)
            {
                return NotFound();
            }

            return View(site);
        }

        // GET: Sites/Create
        public IActionResult Create()
        {
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Nom");
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Designation");
            ViewData["Type"] = new List<SelectListItem>
        {
            new SelectListItem { Text = "Barrage", Value = "Barrage" },
            //new SelectListItem { Text = "", Value = "" }
        };
            return View();
        }

        // POST: Sites/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,LocalisationBarrId,Type,Capacite,VillePlusProche,HauteurBarr,DistVillePlusProche,CodeRetNormal,DateMiseEnServ,LaRetenue,AgenceId")] Site site)
        {
            if (ModelState.IsValid)
            {
                _context.Add(site);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Id", site.AgenceId);
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Designation", site.LocalisationBarrId);
            return View(site);
        }

        // GET: Sites/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null || _context.Site == null)
            {
                return NotFound();
            }

            var site = await _context.Site.FindAsync(id);
            if (site == null)
            {
                return NotFound();
            }
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Id", site.AgenceId);
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Id", site.LocalisationBarrId);
            return View(site);
        }

        // POST: Sites/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,Nom,LocalisationBarrId,Type,Capacite,VillePlusProche,HauteurBarr,DistVillePlusProche,CodeRetNormal,DateMiseEnServ,LaRetenue,AgenceId")] Site site)
        {
            if (id != site.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(site);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SiteExists(site.Id))
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
            ViewData["AgenceId"] = new SelectList(_context.Agence, "Id", "Id", site.AgenceId);
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Id", site.LocalisationBarrId);
            return View(site);
        }

        // GET: Sites/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null || _context.Site == null)
            {
                return NotFound();
            }

            var site = await _context.Site
                .Include(s => s.Agence)
                .Include(s => s.LocalisationBarr)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (site == null)
            {
                return NotFound();
            }

            return View(site);
        }

        // POST: Sites/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            if (_context.Site == null)
            {
                return Problem("Entity set 'CondorVContext.Site'  is null.");
            }
            var site = await _context.Site.FindAsync(id);
            if (site != null)
            {
                _context.Site.Remove(site);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SiteExists(long id)
        {
          return (_context.Site?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
