using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public enum LocalisationBarr
    {
        Amont,
        Aval,
        Fondation,
        ND,
        Noayau,
        RechercheAmont,
        RechercheAval,
        RD,
        RG,
    }
    public class Barrage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; } 
        public string Nom { get; set; }
        public LocalisationBarr Localisation { get; set; }
        public double Capacite { get; set; }
        public string VillePlusProche { get; set; }
        public double HauteurBarr { get; set; }
        public double DistVillePlusProche { get; set; }
        public string CodeRetNormal { get; set; }
        public DateTime DateMiseEnServ { get; set; }
        public string LaRetenue { get; set; }
        //Table HSV
        //But de Barrage
        [JsonIgnore]
        public ICollection<Utilisateur>? Utilisateurs { get; set; }
        public long? AgenceId { get; set; }
        [JsonIgnore]
        public Agence? Agence { get; set; }

        public Barrage() { }
    }
}
