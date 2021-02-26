﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using gpsAPI.Models;

namespace gpsAPI.Migrations
{
    [DbContext(typeof(GpsContext))]
    [Migration("20210226022016_GpsModel")]
    partial class GpsModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("gpsAPI.Models.Gps", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<DateTime?>("createdAt")
                        .HasColumnType("datetime2");

                    b.Property<double>("latitude")
                        .HasColumnType("float");

                    b.Property<double>("longitude")
                        .HasColumnType("float");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("owner")
                        .HasColumnType("bigint");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("updatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("id");

                    b.ToTable("GpsItems");
                });
#pragma warning restore 612, 618
        }
    }
}