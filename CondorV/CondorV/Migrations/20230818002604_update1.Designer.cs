﻿// <auto-generated />
using System;
using CondorV.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CondorV.Migrations
{
    [DbContext(typeof(CondorVContext))]
    [Migration("20230818002604_update1")]
    partial class update1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CondorV.Models.BD.Agence", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Ville")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Agence");
                });

            modelBuilder.Entity("CondorV.Models.BD.LocalisationBarr", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Designation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LocalisationBarr");
                });

            modelBuilder.Entity("CondorV.Models.BD.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<bool>("ControleTotal")
                        .HasColumnType("bit");

                    b.Property<bool>("Creer")
                        .HasColumnType("bit");

                    b.Property<string>("Designation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Lecture")
                        .HasColumnType("bit");

                    b.Property<bool>("Modifier")
                        .HasColumnType("bit");

                    b.Property<bool>("Supprimer")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("CondorV.Models.BD.Site", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<long?>("AgenceId")
                        .HasColumnType("bigint");

                    b.Property<double>("Capacite")
                        .HasColumnType("float");

                    b.Property<string>("CodeRetNormal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateMiseEnServ")
                        .HasColumnType("datetime2");

                    b.Property<double>("DistVillePlusProche")
                        .HasColumnType("float");

                    b.Property<double>("HauteurBarr")
                        .HasColumnType("float");

                    b.Property<string>("LaRetenue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LocalisationBarrId")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VillePlusProche")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AgenceId");

                    b.HasIndex("LocalisationBarrId");

                    b.ToTable("Site");
                });

            modelBuilder.Entity("CondorV.Models.BD.Utilisateur", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<long?>("AgenceId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("DateCreation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(250)");

                    b.Property<bool>("EstActive")
                        .HasColumnType("bit");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(500)");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.Property<long?>("SiteId")
                        .HasColumnType("bigint");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("AgenceId");

                    b.HasIndex("RoleId");

                    b.HasIndex("SiteId");

                    b.ToTable("Utilisateur");
                });

            modelBuilder.Entity("CondorV.Models.BD.Site", b =>
                {
                    b.HasOne("CondorV.Models.BD.Agence", "Agence")
                        .WithMany("Sites")
                        .HasForeignKey("AgenceId");

                    b.HasOne("CondorV.Models.BD.LocalisationBarr", "LocalisationBarr")
                        .WithMany("Sites")
                        .HasForeignKey("LocalisationBarrId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Agence");

                    b.Navigation("LocalisationBarr");
                });

            modelBuilder.Entity("CondorV.Models.BD.Utilisateur", b =>
                {
                    b.HasOne("CondorV.Models.BD.Agence", "Agence")
                        .WithMany("Utilisateurs")
                        .HasForeignKey("AgenceId");

                    b.HasOne("CondorV.Models.BD.Role", "Role")
                        .WithMany("Utilisateurs")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CondorV.Models.BD.Site", "Site")
                        .WithMany("Utilisateurs")
                        .HasForeignKey("SiteId");

                    b.Navigation("Agence");

                    b.Navigation("Role");

                    b.Navigation("Site");
                });

            modelBuilder.Entity("CondorV.Models.BD.Agence", b =>
                {
                    b.Navigation("Sites");

                    b.Navigation("Utilisateurs");
                });

            modelBuilder.Entity("CondorV.Models.BD.LocalisationBarr", b =>
                {
                    b.Navigation("Sites");
                });

            modelBuilder.Entity("CondorV.Models.BD.Role", b =>
                {
                    b.Navigation("Utilisateurs");
                });

            modelBuilder.Entity("CondorV.Models.BD.Site", b =>
                {
                    b.Navigation("Utilisateurs");
                });
#pragma warning restore 612, 618
        }
    }
}