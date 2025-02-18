using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using API_NetCore.Data;

var builder = WebApplication.CreateBuilder(args);

// ?? Agregar Entity Framework Core con SQLite
builder.Services.AddDbContext<AppDbContext>();

// ?? Agregar controladores
builder.Services.AddControllers();

// ?? Habilitar autorización (soluciona el error)
builder.Services.AddAuthorization();

var app = builder.Build();

// Habilitar CORS si es necesario
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthorization();  // ?? Asegurarse de agregarlo aquí
app.MapControllers();
app.Run();
