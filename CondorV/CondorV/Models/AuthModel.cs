using System.ComponentModel.DataAnnotations;

namespace CondorV.Models
{
    public class AuthModel
    {
        [Required(ErrorMessage = "Ce champs est obligatoire!")]
        [StringLength(100,MinimumLength =2)]
        //[EmailAddress]
        public string Login { get; set; }

        [Required(ErrorMessage = "Ce champs est obligatoire!")]
        public string Password { get; set; }
    }
}
