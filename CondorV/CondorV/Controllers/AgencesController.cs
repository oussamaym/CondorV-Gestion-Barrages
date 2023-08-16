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
    public class AgencesController : Controller
    {
        private readonly CondorVContext _context;

        public AgencesController(CondorVContext context)
        {
            _context = context;
        }

        // GET: Agences
        public async Task<IActionResult> Index()
        {
              return _context.Agence != null ? 
                          View(await _context.Agence.ToListAsync()) :
                          Problem("Entity set 'CondorVContext.Agence'  is null.");
        }

        // GET: Agences/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null || _context.Agence == null)
            {
                return NotFound();
            }

            var agence = await _context.Agence
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agence == null)
            {
                return NotFound();
            }

            return View(agence);
        }

        // GET: Agences/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Agences/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom,Ville")] Agence agence)
        {
            if (ModelState.IsValid)
            {
                _context.Add(agence);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(agence);
        }

        // GET: Agences/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null || _context.Agence == null)
            {
                return NotFound();
            }

            var agence = await _context.Agence.FindAsync(id);
            if (agence == null)
            {
                return NotFound();
            }
            return View(agence);
        }

        // POST: Agences/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,Nom,Ville")] Agence agence)
        {
            if (id != agence.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(agence);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgenceExists(agence.Id))
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
            return View(agence);
        }

        // GET: Agences/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null || _context.Agence == null)
            {
                return NotFound();
            }

            var agence = await _context.Agence
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agence == null)
            {
                return NotFound();
            }

            return View(agence);
        }

        // POST: Agences/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            if (_context.Agence == null)
            {
                return Problem("Entity set 'CondorVContext.Agence'  is null.");
            }
            var agence = await _context.Agence.FindAsync(id);
            if (agence != null)
            {
                _context.Agence.Remove(agence);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AgenceExists(long id)
        {
          return (_context.Agence?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
