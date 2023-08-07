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
    public class BarragesController : Controller
    {
        private readonly CondorVContext _context;

        public BarragesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: Barrages
        public async Task<IActionResult> Index()
        {
            var condorVContext = _context.Barrage.Include(b => b.Agence);
            return View(await condorVContext.ToListAsync());
        }

        // GET: Barrages/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null || _context.Barrage == null)
            {
                return NotFound();
            }

            var barrage = await _context.Barrage
                .Include(b => b.Agence)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (barrage == null)
            {
                return NotFound();
            }

            return View(barrage);
        }

        // GET: Barrages/Create
        public IActionResult Create()
        {
            ViewData["AgenceId"] = new SelectList(_context.Set<Agence>(), "Id", "Nom");
            return View();
        }

        // POST: Barrages/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Localisation,Capacite,VillePlusProche,HauteurBarr,DistVillePlusProche,CodeRetNormal,DateMiseEnServ,LaRetenue,AgenceId")] Barrage barrage)
        {
            Console.WriteLine("ok");

            if (ModelState.IsValid)
            {
                Console.WriteLine("ok");
                _context.Add(barrage);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else
            {
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                {
                    Console.WriteLine(error.ErrorMessage);
                }
            }
            ViewData["AgenceId"] = new SelectList(_context.Set<Agence>(), "Id", "Nom", barrage.AgenceId);
            return View(barrage);
        }

        // GET: Barrages/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null || _context.Barrage == null)
            {
                return NotFound();
            }

            var barrage = await _context.Barrage.FindAsync(id);
            if (barrage == null)
            {
                return NotFound();
            }
            ViewData["AgenceId"] = new SelectList(_context.Set<Agence>(), "Id", "Nom", barrage.AgenceId);
            return View(barrage);
        }

        // POST: Barrages/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,Nom,Localisation,Capacite,VillePlusProche,HauteurBarr,DistVillePlusProche,CodeRetNormal,DateMiseEnServ,LaRetenue,AgenceId")] Barrage barrage)
        {
            if (id != barrage.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(barrage);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BarrageExists(barrage.Id))
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
            ViewData["AgenceId"] = new SelectList(_context.Set<Agence>(), "Id", "Nom", barrage.AgenceId);
            return View(barrage);
        }

        // GET: Barrages/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null || _context.Barrage == null)
            {
                return NotFound();
            }

            var barrage = await _context.Barrage
                .Include(b => b.Agence)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (barrage == null)
            {
                return NotFound();
            }

            return View(barrage);
        }

        // POST: Barrages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            if (_context.Barrage == null)
            {
                return Problem("Entity set 'CondorVContext.Barrage'  is null.");
            }
            var barrage = await _context.Barrage.FindAsync(id);
            if (barrage != null)
            {
                _context.Barrage.Remove(barrage);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BarrageExists(long id)
        {
          return (_context.Barrage?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
