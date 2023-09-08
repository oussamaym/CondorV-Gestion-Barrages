using CondorV.Data;
using CondorV.Models;
using CondorV.Models.BD;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using NuGet.Protocol.Plugins;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CondorV.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly CondorVContext _authContext;

        public HomeController(ILogger<HomeController> logger, CondorVContext authContext)
        {
            _logger = logger;
            _authContext = authContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        public ActionResult Login(AuthModel auth)
        {
            if (ModelState.IsValid)
            {
                /*using (Hotel2Entities1 db = new Hotel2Entities1())
                {
                    var obj = db.Utilisateur.Where(a => a.email.Equals(auth.Email) && a.mdp.Equals(auth.Password)).FirstOrDefault();
                    if ((auth.Email == "Admin@gmail.com") && (auth.Password == "admin123"))
                    {
                        Session["admin"] = "admin";
                        return RedirectToAction("Index", "Hotels");
                    }
                    else if (obj != null)
                    {
                        Session["user"] = obj.nom;
                        return RedirectToAction("Indexuser", "Hotels", new { id = obj.id_utilisateur });
                    }

                }*/
                try
                {
                    Utilisateur? connectedUtilisateur = _authContext.Utilisateur
                        .FirstOrDefault<Utilisateur>(obj => (obj.UserName.Equals(auth.Login) || obj.Email.Equals(auth.Login)) && obj.EstActive == true);
                    //Si login est un email   

                    if (connectedUtilisateur is null)
                    {
                        return RedirectToAction("Error", "Home");
                    }

                    if (BCrypt.Net.BCrypt.Verify(auth.Password, connectedUtilisateur.Password) == false)
                    {
                        return BadRequest("400-01");
                    }


                    /*var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier,connectedUtilisateur.UserName),
                    new Claim(ClaimTypes.PrimarySid,connectedUtilisateur.Id.ToString()),
                };

                    // ajouter les roles
                    string[] roles = Array.Empty<string>();
                    if (connectedUtilisateur.Profile is not null)
                    {
                        roles = connectedUtilisateur.Profile.Roles.Split(";");
                    }


                    claims.AddRange(roles.Select(x => new Claim(ClaimTypes.Role, x)));
                    //claims.AddRange(roles.Select(x => new Claim("Role", x)));


                    // Console.WriteLine("##############################################################");
                    // Console.WriteLine(JsonSerializer.Serialize(claims));
                    //  Console.WriteLine("##############################################################");

                    var token = CreateToken(claims);


                    // Debut Log Authentification
                    var logauthentification = new Logauthent
                    {
                        Utilisateur = connectedUtilisateur,
                        DateConnexion = DateTime.UtcNow,
                        ClientIp = _httpContext?.HttpContext?.Connection?.RemoteIpAddress?.ToString(),
                        ClientName = _httpContext?.HttpContext?.Request.Host.Host
                    };
                    _authContext.Logauthentifications.Add(logauthentification);
                    await _authContext.SaveChangesAsync();
                    // Debut Log Authentification



                    return Ok(new
                    {
                        AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                        Expiration = token.ValidTo
                    });*/
                    return RedirectToAction("Index", "Utilisateurs");
                }
                catch (Exception ex)
                {
                    return View(auth);
                }

            }
            return View(auth);

        }



        public IActionResult Privacy()
        {
            return View();
        }

     
    }
}