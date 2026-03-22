using AttendeeService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<AttendeeServices>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();