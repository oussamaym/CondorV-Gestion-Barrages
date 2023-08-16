﻿using System;
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
                name: "LocalisationBarr",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocalisationBarr", x => x.Id);
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
                name: "Site",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalisationBarrId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_Site", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Site_Agence_AgenceId",
                        column: x => x.AgenceId,
                        principalTable: "Agence",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Site_LocalisationBarr_LocalisationBarrId",
                        column: x => x.LocalisationBarrId,
                        principalTable: "LocalisationBarr",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    SiteId = table.Column<long>(type: "bigint", nullable: true),
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
                        name: "FK_Utilisateur_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Utilisateur_Site_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Site",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Site_AgenceId",
                table: "Site",
                column: "AgenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Site_LocalisationBarrId",
                table: "Site",
                column: "LocalisationBarrId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_AgenceId",
                table: "Utilisateur",
                column: "AgenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_RoleId",
                table: "Utilisateur",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateur_SiteId",
                table: "Utilisateur",
                column: "SiteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Utilisateur");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Site");

            migrationBuilder.DropTable(
                name: "Agence");

            migrationBuilder.DropTable(
                name: "LocalisationBarr");
        }
    }
}
