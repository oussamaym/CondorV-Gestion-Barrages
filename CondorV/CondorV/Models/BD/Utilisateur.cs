using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CondorV.Models.BD
{
    public class Utilisateur
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string Nom { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string Prenom { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string UserName { get; set; }

       
        [Column(TypeName = "varchar(250)")]
        [EmailAddress]
        public string? Email { get; set; }

        
        [Column(TypeName = "varchar(500)")]
        //[JsonIgnore]
        public string Password { get; set; }

        public DateTime? DateCreation { get; set; } = DateTime.Now;

        public bool EstActive { get; set; } = false; // Par defaut n'est pas active 
        public long RoleId { get; set; }
        //[ForeignKey("RoleId")]
        
        public Role? Role { get; set; }
        //[ForeignKey("Id")]
        public long? SiteId { get; set; }
        
        public Site? Site { get; set; }
        //[ForeignKey("AgenceId")]
        public long? AgenceId { get; set; }
        [JsonIgnore]
        public Agence? Agence { get; set; }
        public Utilisateur() { }
        public Utilisateur(string nom, string prenom, string email, string userName, string password, bool estActive,long roleId,long? siteId,long? agenceId)
        {
            Nom = nom;
            Prenom = prenom;
            UserName = userName;
            Email = email;
            Password = password;
            EstActive = estActive;
            RoleId = roleId;
            SiteId = siteId;
            AgenceId = agenceId;
        }
    }
}
