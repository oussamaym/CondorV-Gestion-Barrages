using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class update5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Grandeur_LocalisationBarr_LocalisationBarrId",
                table: "Grandeur");

            migrationBuilder.DropForeignKey(
                name: "FK_Site_LocalisationBarr_LocalisationBarrId",
                table: "Site");

            migrationBuilder.DropTable(
                name: "LocalisationBarr");

            migrationBuilder.DropIndex(
                name: "IX_Site_LocalisationBarrId",
                table: "Site");

            migrationBuilder.DropIndex(
                name: "IX_Grandeur_LocalisationBarrId",
                table: "Grandeur");

            migrationBuilder.DropColumn(
                name: "LocalisationBarrId",
                table: "Site");

            migrationBuilder.DropColumn(
                name: "LocalisationBarrId",
                table: "Grandeur");

            migrationBuilder.AddColumn<string>(
                name: "LocalisationBarr",
                table: "Site",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LocalisationBarr",
                table: "Grandeur",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocalisationBarr",
                table: "Site");

            migrationBuilder.DropColumn(
                name: "LocalisationBarr",
                table: "Grandeur");

            migrationBuilder.AddColumn<int>(
                name: "LocalisationBarrId",
                table: "Site",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LocalisationBarrId",
                table: "Grandeur",
                type: "int",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_Site_LocalisationBarrId",
                table: "Site",
                column: "LocalisationBarrId");

            migrationBuilder.CreateIndex(
                name: "IX_Grandeur_LocalisationBarrId",
                table: "Grandeur",
                column: "LocalisationBarrId");

            migrationBuilder.AddForeignKey(
                name: "FK_Grandeur_LocalisationBarr_LocalisationBarrId",
                table: "Grandeur",
                column: "LocalisationBarrId",
                principalTable: "LocalisationBarr",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Site_LocalisationBarr_LocalisationBarrId",
                table: "Site",
                column: "LocalisationBarrId",
                principalTable: "LocalisationBarr",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
