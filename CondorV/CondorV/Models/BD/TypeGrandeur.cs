using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class TypeGrandeur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Nom { get; set; }
        [JsonIgnore]
        public ICollection<SitesGrandeurs>? SitesGrandeurs { get; set; }
    }
}
