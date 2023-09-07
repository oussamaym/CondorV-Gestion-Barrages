using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProcessorName",
                table: "Grandeur",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Mesure",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GrandeurId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesure", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mesure_Grandeur_GrandeurId",
                        column: x => x.GrandeurId,
                        principalTable: "Grandeur",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mesure_GrandeurId",
                table: "Mesure",
                column: "GrandeurId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mesure");

            migrationBuilder.DropColumn(
                name: "ProcessorName",
                table: "Grandeur");
        }
    }
}
