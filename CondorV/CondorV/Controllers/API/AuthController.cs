using CondorV.Data;
using CondorV.Models;
using CondorV.Models.BD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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
        [AllowAnonymous]
        public async Task<ActionResult> Login(AuthModel auth)
        {
            try
            {
                Utilisateur? connectedUtilisateur = _authContext.Utilisateur.Include(r => r.Role).Include(s => s.Site).FirstOrDefault<Utilisateur>(obj => (obj.UserName.Equals(auth.Login) || obj.Email.Equals(auth.Login)) && obj.EstActive == true);
                if (connectedUtilisateur is null || BCrypt.Net.BCrypt.Verify(auth.Password, connectedUtilisateur.Password) == false)
                {
                    return base.BadRequest(new
                    {
                        Status = StatusCodes.Status400BadRequest,
                        Erreur = new
                        {
                            code = "400",
                            message = "Informations saisies incorrectes",
                            id = this.HttpContext.TraceIdentifier
                        }
                    });
                }
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,connectedUtilisateur.UserName),
                    new Claim(ClaimTypes.PrimarySid,connectedUtilisateur.Id.ToString()),

                };

                // ajouter les permissions
                if (connectedUtilisateur.Role != null)
                {
                    var role = connectedUtilisateur.Role;


                    if (role.Creer)
                    {
                        claims.Add(new Claim("AjouterPermission", "Ajouter"));
                    }
                    if (role.Modifier)
                    {
                        claims.Add(new Claim("ModifierPermission", "Modifier"));
                    }
                    if (role.Lecture)
                    {
                        claims.Add(new Claim("LecturePermission", "Lecture"));
                    }
                    if (role.Supprimer)
                    {
                        claims.Add(new Claim("SupprimerPermission", "Supprimer"));
                    }
                    claims.Add(new Claim(ClaimTypes.Role, role.Designation));
                }
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
                
                return Ok(new
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Expiration = token.ValidTo,
                    UtilisateurConnecte = new
                    {
                        Id = connectedUtilisateur.Id,
                        Nom = connectedUtilisateur.Nom,
                        Prenom = connectedUtilisateur.Prenom,
                        UserName = connectedUtilisateur.UserName,
                        Role = connectedUtilisateur.Role,
                        Site = connectedUtilisateur.Site,
                        Agence= connectedUtilisateur.Agence,
                        SiteId= connectedUtilisateur.SiteId,
                        AgenceId = connectedUtilisateur.AgenceId,
                        EstActive = connectedUtilisateur.EstActive,
                        Email = connectedUtilisateur.Email

                        // Other properties you want to include
                    },
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
        [HttpGet("connecte")]

        public async Task<ActionResult> GetConnected()
        {
            try
            {

                var claimsIdentity = this.User.Identity as ClaimsIdentity;
                Console.WriteLine("ClaimsIdentity:");
                foreach (var claim in claimsIdentity.Claims)
                {
                    Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
                }
                var userId = claimsIdentity.FindFirst(ClaimTypes.PrimarySid)?.Value;
                var utilisateur = _authContext.Utilisateur.FirstOrDefault<Utilisateur>(obj => obj.Id == Guid.Parse(userId));

                return Ok("200");
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

        /*private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }
        */

    }
}
