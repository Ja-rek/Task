using Application.Data;
using Application.Services;
using Application.Users;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var configuration = builder.Configuration;
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(configuration.GetConnectionString("DataContext")));

builder.Services.AddScoped<UserDAOService>();
builder.Services.AddScoped(c => new AgeCounter(DateTime.Now));
builder.Services.AddScoped<UserResultsFactory>();
builder.Services.AddScoped(c => new UserQueryService(c.GetService<UserDAOService>(), c.GetService<UserResultsFactory>()));

builder.Services.AddCors();
var app = builder.Build();

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
    var context = serviceScope.ServiceProvider.GetService<DataContext>();
    context.Database.EnsureCreated();
}


//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}


app.UseCors(
    options => options
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
