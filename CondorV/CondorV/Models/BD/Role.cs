using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class Role
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Designation { get; set; }
        public bool Creer { get; set; } =false;
        public bool Modifier { get; set; } =false;
        public bool Supprimer { get; set; } =false;
        public bool Lecture { get; set; } =false;
        [JsonIgnore]
        public ICollection<Utilisateur>? Utilisateurs { get; set; }
        public Role() { }
        public Role(string designation)
        {
          Designation=designation;
        }



    }
}
