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
    public class TypeGrandeursController : Controller
    {
        private readonly CondorVContext _context;

        public TypeGrandeursController(CondorVContext context)
        {
            _context = context;
        }

        // GET: TypeGrandeurs
        public async Task<IActionResult> Index()
        {
              return _context.TypeGrandeur != null ? 
                          View(await _context.TypeGrandeur.ToListAsync()) :
                          Problem("Entity set 'CondorVContext.TypeGrandeur'  is null.");
        }

        // GET: TypeGrandeurs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TypeGrandeur == null)
            {
                return NotFound();
            }

            var typeGrandeur = await _context.TypeGrandeur
                .FirstOrDefaultAsync(m => m.Id == id);
            if (typeGrandeur == null)
            {
                return NotFound();
            }

            return View(typeGrandeur);
        }

        // GET: TypeGrandeurs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TypeGrandeurs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nom")] TypeGrandeur typeGrandeur)
        {
            if (ModelState.IsValid)
            {
                _context.Add(typeGrandeur);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(typeGrandeur);
        }

        // GET: TypeGrandeurs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TypeGrandeur == null)
            {
                return NotFound();
            }

            var typeGrandeur = await _context.TypeGrandeur.FindAsync(id);
            if (typeGrandeur == null)
            {
                return NotFound();
            }
            return View(typeGrandeur);
        }

        // POST: TypeGrandeurs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nom")] TypeGrandeur typeGrandeur)
        {
            if (id != typeGrandeur.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(typeGrandeur);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TypeGrandeurExists(typeGrandeur.Id))
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
            return View(typeGrandeur);
        }

        // GET: TypeGrandeurs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TypeGrandeur == null)
            {
                return NotFound();
            }

            var typeGrandeur = await _context.TypeGrandeur
                .FirstOrDefaultAsync(m => m.Id == id);
            if (typeGrandeur == null)
            {
                return NotFound();
            }

            return View(typeGrandeur);
        }

        // POST: TypeGrandeurs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TypeGrandeur == null)
            {
                return Problem("Entity set 'CondorVContext.TypeGrandeur'  is null.");
            }
            var typeGrandeur = await _context.TypeGrandeur.FindAsync(id);
            if (typeGrandeur != null)
            {
                _context.TypeGrandeur.Remove(typeGrandeur);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TypeGrandeurExists(int id)
        {
          return (_context.TypeGrandeur?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
