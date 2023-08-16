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
    public class LocalisationBarrsController : Controller
    {
        private readonly CondorVContext _context;

        public LocalisationBarrsController(CondorVContext context)
        {
            _context = context;
        }

        // GET: LocalisationBarrs
        public async Task<IActionResult> Index()
        {
              return _context.LocalisationBarr != null ? 
                          View(await _context.LocalisationBarr.ToListAsync()) :
                          Problem("Entity set 'CondorVContext.LocalisationBarr'  is null.");
        }

        // GET: LocalisationBarrs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.LocalisationBarr == null)
            {
                return NotFound();
            }

            var localisationBarr = await _context.LocalisationBarr
                .FirstOrDefaultAsync(m => m.Id == id);
            if (localisationBarr == null)
            {
                return NotFound();
            }

            return View(localisationBarr);
        }

        // GET: LocalisationBarrs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: LocalisationBarrs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Designation")] LocalisationBarr localisationBarr)
        {
            if (ModelState.IsValid)
            {
                _context.Add(localisationBarr);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(localisationBarr);
        }

        // GET: LocalisationBarrs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.LocalisationBarr == null)
            {
                return NotFound();
            }

            var localisationBarr = await _context.LocalisationBarr.FindAsync(id);
            if (localisationBarr == null)
            {
                return NotFound();
            }
            return View(localisationBarr);
        }

        // POST: LocalisationBarrs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Designation")] LocalisationBarr localisationBarr)
        {
            if (id != localisationBarr.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(localisationBarr);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LocalisationBarrExists(localisationBarr.Id))
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
            return View(localisationBarr);
        }

        // GET: LocalisationBarrs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.LocalisationBarr == null)
            {
                return NotFound();
            }

            var localisationBarr = await _context.LocalisationBarr
                .FirstOrDefaultAsync(m => m.Id == id);
            if (localisationBarr == null)
            {
                return NotFound();
            }

            return View(localisationBarr);
        }

        // POST: LocalisationBarrs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.LocalisationBarr == null)
            {
                return Problem("Entity set 'CondorVContext.LocalisationBarr'  is null.");
            }
            var localisationBarr = await _context.LocalisationBarr.FindAsync(id);
            if (localisationBarr != null)
            {
                _context.LocalisationBarr.Remove(localisationBarr);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LocalisationBarrExists(int id)
        {
          return (_context.LocalisationBarr?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
