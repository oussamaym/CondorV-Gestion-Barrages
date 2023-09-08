using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CondorV.Models.BD;

namespace CondorV.Data
{
    public class CondorVContext : DbContext
    {
        public CondorVContext (DbContextOptions<CondorVContext> options)
            : base(options)
        {
        }

        public DbSet<CondorV.Models.BD.Utilisateur> Utilisateur { get; set; } = default!;

        public DbSet<CondorV.Models.BD.Role>? Role { get; set; }


        public DbSet<CondorV.Models.BD.Agence>? Agence { get; set; }


        public DbSet<CondorV.Models.BD.Site>? Site { get; set; }


        public DbSet<CondorV.Models.BD.Grandeur>? Grandeur { get; set; }


        public DbSet<CondorV.Models.BD.TypeGrandeur>? TypeGrandeur { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SitesGrandeurs>()
                .HasKey(bc => new { bc.SiteId, bc.TypeGrandeurId });
            modelBuilder.Entity<SitesGrandeurs>()
                .HasOne(bc => bc.Site)
                .WithMany(b => b.SitesGrandeurs)
                .HasForeignKey(bc => bc.SiteId);
            modelBuilder.Entity<SitesGrandeurs>()
                .HasOne(bc => bc.TypeGrandeur)
                .WithMany(c => c.SitesGrandeurs)
                .HasForeignKey(bc => bc.TypeGrandeurId);

        }
        public DbSet<CondorV.Models.BD.SitesGrandeurs>? SitesGrandeurs { get; set; }
        public DbSet<CondorV.Models.BD.Mesure>? Mesure { get; set; }
        
    }
}
