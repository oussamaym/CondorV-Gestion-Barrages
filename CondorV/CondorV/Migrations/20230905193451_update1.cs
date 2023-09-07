using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Ancre",
                table: "Grandeur",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ancre",
                table: "Grandeur");
        }
    }
}
