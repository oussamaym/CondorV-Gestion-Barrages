using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class Agence
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string Nom { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string Ville { get; set; }
        [JsonIgnore]
        public ICollection<Site>? Sites { get; set; }
        [JsonIgnore]
        public ICollection<Utilisateur>? Utilisateurs { get; set; }

        public Agence() { }
        public  Agence(string nom, string ville)
        {
            Nom = nom;  
            Ville = ville;  
        }
    }
}
