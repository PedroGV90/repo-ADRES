using API_NetCore.Data;
using API_NetCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_NetCore.Controllers
{
    [Route("api/adquisiciones")]
    [ApiController]
    public class AdquisicionesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdquisicionesController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todas las adquisiciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Adquisicion>>> GetAdquisiciones()
        {
            return await _context.Adquisiciones.ToListAsync();
        }

        // Obtener una adquisición por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Adquisicion>> GetAdquisicion(int id)
        {
            var adquisicion = await _context.Adquisiciones.FindAsync(id);
            if (adquisicion == null) return NotFound();
            return adquisicion;
        }

        // Crear una nueva adquisición
        [HttpPost]
        public async Task<ActionResult<Adquisicion>> PostAdquisicion(Adquisicion adquisicion)
        {
            _context.Adquisiciones.Add(adquisicion);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAdquisicion), new { id = adquisicion.Id }, adquisicion);
        }

        // Actualizar una adquisición
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdquisicion(int id, Adquisicion adquisicion)
        {
            if (id != adquisicion.Id) return BadRequest();

            _context.Entry(adquisicion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Adquisiciones.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Eliminar una adquisición
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdquisicion(int id)
        {
            var adquisicion = await _context.Adquisiciones.FindAsync(id);
            if (adquisicion == null) return NotFound();

            _context.Adquisiciones.Remove(adquisicion);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
