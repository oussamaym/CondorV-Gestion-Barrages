using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CondorV.Models.BD
{
    public class Mesure
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }    
        public DateTime Date { get; set; }
        public double Valeur { get; set; }
        public long GrandeurId { get; set; }
      
        public Grandeur? Grandeur { get; set; }

    }
}
