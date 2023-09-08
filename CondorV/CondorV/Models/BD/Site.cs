using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class Site
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; } 
        public string Nom { get; set; }
        public string LocalisationBarr { get; set; }
        public string Type { get; set; }
        public double Capacite { get; set; }
        public string VillePlusProche { get; set; }
        public double HauteurBarr { get; set; }
        public double DistVillePlusProche { get; set; }
        public string CodeRetNormal { get; set; }
        public DateTime DateMiseEnServ { get; set; }
        public string LaRetenue { get; set; }
        //Table HSV
        //But de Site
        [JsonIgnore]
        public ICollection<Utilisateur>? Utilisateurs { get; set; }
        public long? AgenceId { get; set; }
        //[JsonIgnore]
        public Agence? Agence { get; set; }
        [JsonIgnore]
        public ICollection<SitesGrandeurs>? SitesGrandeurs { get; set; }

        public Site() { }
    }
}
