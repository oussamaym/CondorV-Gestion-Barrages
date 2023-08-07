using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agence",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "varchar(50)", nullable: false),
                    Ville = table.Column<string>(type: "varchar(20)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agence", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ControleTotal = table.Column<bool>(type: "bit", nullable: false),
                    AucunDroit = table.Column<bool>(type: "bit", nullable: false),
                    Creer = table.Column<bool>(type: "bit", nullable: false),
                    Modifier = table.Column<bool>(type: "bit", nullable: false),
                    Supprimer = table.Column<bool>(type: "bit", nullable: false),
                    Lecture = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Barrage",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Localisation = table.Column<int>(type: "int", nullable: false),
                    Capacite = table.Column<double>(type: "float", nullable: false),
                    VillePlusProche = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HauteurBarr = table.Column<double>(type: "float", nullable: false),
                    DistVillePlusProche = table.Column<double>(type: "float", nullable: false),
                    CodeRetNormal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateMiseEnServ = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LaRetenue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgenceId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Barrage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Barrage_Agence_AgenceId",
                        column: x => x.AgenceId,
                        principalTable: "Agence",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Utilisateur",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nom = table.Column<string>(type: "varchar(200)", nullable: false),
                    Prenom = table.Column<string>(type: "varchar(200)", nullable: false),
                    UserName = table.Column<string>(type: "varchar(200)", nullable: false),
                    Email = table.Column<string>(type: "varchar(250)", nullable: true),
                    Password = table.Column<string>(type: "varchar(500)", nullable: false),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EstActive = table.Column<bool>(type: "bit", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false),
                    BarrageId = table.Column<long>(type: "bigint", nullable: true),
                    AgenceId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Utilisateur_Agence_AgenceId",
                        column: x => x.AgenceId,
                        principalTable: "Agence",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Utilisateur_Barrage_BarrageId",
                        column: x => x.BarrageId,
                        principalTable: "Barrage",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Utilisateur_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Barrage_AgenceId",
                table: "Barrage",
                column: "AgenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_AgenceId",
                table: "Utilisateur",
                column: "AgenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_BarrageId",
                table: "Utilisateur",
                column: "BarrageId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_RoleId",
                table: "Utilisateur",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Utilisateur");

            migrationBuilder.DropTable(
                name: "Barrage");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Agence");
        }
    }
}
