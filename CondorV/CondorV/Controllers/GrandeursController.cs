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
    public class GrandeursController : Controller
    {
        private readonly CondorVContext _context;

        public GrandeursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: Grandeurs
        public async Task<IActionResult> Index()
        {
            var condorVContext = _context.Grandeur.Include(g => g.LocalisationBarr).Include(g => g.Site).Include(g => g.TypeGrandeur);
            return View(await condorVContext.ToListAsync());
        }

        // GET: Grandeurs/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null || _context.Grandeur == null)
            {
                return NotFound();
            }

            var grandeur = await _context.Grandeur
                .Include(g => g.LocalisationBarr)
                .Include(g => g.Site)
                .Include(g => g.TypeGrandeur)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (grandeur == null)
            {
                return NotFound();
            }

            return View(grandeur);
        }

        // GET: Grandeurs/Create
        public IActionResult Create()
        {
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Designation");
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Nom");
            ViewData["TypeGrandeurId"] = new SelectList(_context.Set<TypeGrandeur>(), "Id", "Nom");
            return View();
        }

        // POST: Grandeurs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,NomGrandeur,NomAbrege,NomComplet,TypeGrandeurId,Unite,LocalisationBarrId,ModeAcquisiion,FrequenceMesure,PrecisionMesure,CoordonneeX,CoordonneeY,CoordonneeZ,Minimum,Maximum,ValeurDexclusion,ProcessorId,ProcessorUnitId,NumberDecimalDigits,CodeAppareil,HeureMBI,DateMBI,ValeurMBI,PiezomPlusProche,LectureDeBase,Longueur,Calibre,KlCalibrage,LineaireZero,SiteId")] Grandeur grandeur)
        {
            if (ModelState.IsValid)
            {
                _context.Add(grandeur);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Designation", grandeur.LocalisationBarrId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Nom", grandeur.SiteId);
            ViewData["TypeGrandeurId"] = new SelectList(_context.Set<TypeGrandeur>(), "Id", "Nom", grandeur.TypeGrandeurId);
            return View(grandeur);
        }

        // GET: Grandeurs/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null || _context.Grandeur == null)
            {
                return NotFound();
            }

            var grandeur = await _context.Grandeur.FindAsync(id);
            if (grandeur == null)
            {
                return NotFound();
            }
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Id", grandeur.LocalisationBarrId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Id", grandeur.SiteId);
            ViewData["TypeGrandeurId"] = new SelectList(_context.Set<TypeGrandeur>(), "Id", "Id", grandeur.TypeGrandeurId);
            return View(grandeur);
        }

        // POST: Grandeurs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,NomGrandeur,NomAbrege,NomComplet,TypeGrandeurId,Unite,LocalisationBarrId,ModeAcquisiion,FrequenceMesure,PrecisionMesure,CoordonneeX,CoordonneeY,CoordonneeZ,Minimum,Maximum,ValeurDexclusion,ProcessorId,ProcessorUnitId,NumberDecimalDigits,CodeAppareil,HeureMBI,DateMBI,ValeurMBI,PiezomPlusProche,LectureDeBase,Longueur,Calibre,KlCalibrage,LineaireZero,SiteId")] Grandeur grandeur)
        {
            if (id != grandeur.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(grandeur);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GrandeurExists(grandeur.Id))
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
            ViewData["LocalisationBarrId"] = new SelectList(_context.LocalisationBarr, "Id", "Id", grandeur.LocalisationBarrId);
            ViewData["SiteId"] = new SelectList(_context.Site, "Id", "Id", grandeur.SiteId);
            ViewData["TypeGrandeurId"] = new SelectList(_context.Set<TypeGrandeur>(), "Id", "Id", grandeur.TypeGrandeurId);
            return View(grandeur);
        }

        // GET: Grandeurs/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null || _context.Grandeur == null)
            {
                return NotFound();
            }

            var grandeur = await _context.Grandeur
                .Include(g => g.LocalisationBarr)
                .Include(g => g.Site)
                .Include(g => g.TypeGrandeur)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (grandeur == null)
            {
                return NotFound();
            }

            return View(grandeur);
        }

        // POST: Grandeurs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            if (_context.Grandeur == null)
            {
                return Problem("Entity set 'CondorVContext.Grandeur'  is null.");
            }
            var grandeur = await _context.Grandeur.FindAsync(id);
            if (grandeur != null)
            {
                _context.Grandeur.Remove(grandeur);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool GrandeurExists(long id)
        {
          return (_context.Grandeur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
