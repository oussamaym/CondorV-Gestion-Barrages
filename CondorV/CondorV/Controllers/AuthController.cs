using CondorV.Data;
using CondorV.Models;
using CondorV.Models.BD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace CondorV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CondorVContext _authContext;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContext;

        public AuthController(CondorVContext authContext, IConfiguration configuration, IHttpContextAccessor httpContext)
        {
            _authContext = authContext;
            _configuration = configuration;
            _httpContext = httpContext;
        }
        [HttpPost("login")]
        //[AllowAnonymous]
        public async Task<ActionResult> Login(AuthModel auth)
        {
            try
            {
                //Si login est un nom d'utilisateur (UserName)
                Utilisateur? connectedUtilisateur = _authContext.Utilisateur
                    .FirstOrDefault<Utilisateur>(obj => (obj.UserName.Equals(auth.Login) || obj.Email.Equals(auth.Login)) && obj.EstActive == true /*&& obj.Role != null*/);
                Console.WriteLine("Test password : " + connectedUtilisateur.Password);
                if (connectedUtilisateur is null || BCrypt.Net.BCrypt.Verify(auth.Password, connectedUtilisateur.Password) == false)
                {
                    return base.BadRequest(new
                    {
                        Status = StatusCodes.Status400BadRequest,
                        Erreur = new
                        {
                            code = "400",
                            message="Informations saisies incorrectes",
                            id = this.HttpContext.TraceIdentifier
                        }
                    });
                }
                Console.WriteLine("test 2 ");
                var claims = new List<Claim>
                {

                    new Claim(ClaimTypes.NameIdentifier,connectedUtilisateur.UserName),
                    new Claim(ClaimTypes.PrimarySid,connectedUtilisateur.Id.ToString()),
                };


                // ajouter les permissions
                /*string[] permissions = Array.Empty<string>();
                if (connectedUtilisateur.Role is not null)
                {
                   claims.Add
                    
                }
                claims.AddRange(roles.Select(x => new Claim(ClaimTypes.Role, x)));
                //claims.AddRange(roles.Select(x => new Claim("Role", x)));

                */
                 Console.WriteLine("##############################################################");
                 Console.WriteLine(JsonSerializer.Serialize(claims));
                  Console.WriteLine("##############################################################");
                
                var token = CreateToken(claims);


                // Debut Log Authentification
                /* var logauthentification = new Logauthent
                 {
                     Utilisateur = connectedUtilisateur,
                     DateConnexion = DateTime.UtcNow,
                     ClientIp = _httpContext?.HttpContext?.Connection?.RemoteIpAddress?.ToString(),
                     ClientName = _httpContext?.HttpContext?.Request.Host.Host
                 };*/
                //_authContext.Logauthentifications.Add(logauthentification);
                //await _authContext.SaveChangesAsync();
                // Debut Log Authentification

                var viewUrl = "https://localhost:7109/Home/Index";
                return Ok(new
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiration = token.ValidTo,
                    UtilisateurConnecte = connectedUtilisateur,
                    RedirectUrl = viewUrl
                });
            }
            catch (Exception ex)
            {
                return base.StatusCode(
               StatusCodes.Status500InternalServerError,
               new
               {
                   Status = StatusCodes.Status500InternalServerError,
                   Erreur = new
                   {
                       code = "500",
                       message = ex.Message,
                       id = this.HttpContext.TraceIdentifier
                   }
               }
               );
            }
        }
        private JwtSecurityToken CreateToken(List<Claim> claims)
        {

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(tokenValidityInMinutes),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
        [HttpGet("View")]
        public IActionResult GetDotNetView()
        {
            return RedirectToAction("Index", "Utilisateurs");
        }
    }
    }
