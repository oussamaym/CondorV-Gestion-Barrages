using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date",
                table: "Mesure",
                newName: "Date");

            migrationBuilder.AddColumn<double>(
                name: "Valeur",
                table: "Mesure",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Valeur",
                table: "Mesure");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Mesure",
                newName: "date");
        }
    }
}
