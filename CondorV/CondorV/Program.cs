using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using CondorV.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CondorVContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CondorVContext") ?? throw new InvalidOperationException("Connection string 'CondorVContext' not found.")));
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
    options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateActor = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        };
    }
    );
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ControleTotalPermission", policy =>
        policy.RequireClaim("ControleTotalPermission", "ControleTotal"));

    options.AddPolicy("AjouterPermission", policy =>
        policy.RequireClaim("AjouterPermission", "Ajouter"));

    options.AddPolicy("ModifierPermission", policy =>
        policy.RequireClaim("ModifierPermission", "Modifier"));

    options.AddPolicy("SupprimerPermission", policy =>
        policy.RequireClaim("SuprrimerPermission", "Supprimer"));

    options.AddPolicy("LecturePermission", policy =>
        policy.RequireClaim("LecturePermission", "Lecture"));

});


builder.Services.AddCors(options => {options.AddPolicy("AllowNgOrigins",
    builder =>
    {
        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}



app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowNgOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.Run();
