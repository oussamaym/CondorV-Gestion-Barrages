using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CondorV.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AucunDroit",
                table: "Role");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AucunDroit",
                table: "Role",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
