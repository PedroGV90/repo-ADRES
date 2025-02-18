using System.ComponentModel.DataAnnotations;

namespace API_NetCore.Models
{
    public class Adquisicion
    {
        [Key]
        public int Id { get; set; }

        public decimal Presupuesto { get; set; }
        public string Unidad { get; set; }
        public string TipoBienServicio { get; set; }
        public int Cantidad { get; set; }
        public decimal ValorUnitario { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime FechaAdquisicion { get; set; }
        public string Proveedor { get; set; }
        public string Documentacion { get; set; }
    }
}
