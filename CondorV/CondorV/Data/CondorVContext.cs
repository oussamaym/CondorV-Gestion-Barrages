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


        public DbSet<CondorV.Models.BD.LocalisationBarr>? LocalisationBarr { get; set; }
    }
}
