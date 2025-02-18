using API_NetCore.Models;
using Microsoft.EntityFrameworkCore;

namespace API_NetCore.Data
{
    public class AppDbContext : DbContext

    {
        public DbSet<Adquisicion> Adquisiciones { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite("Data Source=D:\\pruebas\\ADRES\\prueba-tecnica-1\\prueba-ADRES\\API-node\\database.db");
        }
    }
}
