using CondorV.Models.BD;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ApiAuthentification1.Models
{
    public class PostUtilisateurModel
    {
        [Required]
        public string Nom { get; set; }

        [Required]
        public string Prenom { get; set; }

 
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
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

        public PostUtilisateurModel(string nom, string prenom, string email, string userName, string password)
        {
            Nom = nom;
            Prenom = prenom;
            Email = email;
            UserName = userName;
            Password = password;
        }
    }
}
