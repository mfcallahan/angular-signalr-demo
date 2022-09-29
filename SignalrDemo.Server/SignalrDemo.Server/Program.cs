// This is the main enry point to the application, Startup.cs and Program.cs are now unified and
// leverage top-level statements, eliinating the need to declare a namespace, class, and main method:
// https://docs.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-6.0?view=aspnetcore-6.0

using SignalrDemo.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
var policyName = "defaultCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(policyName, builder =>
    {
        builder.WithOrigins("https://localhost:4200") // the Angular app url
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Configure SignalR
builder.Services.AddSignalR();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(policyName);
app.MapHub<SignalrDemoHub>("/signalrdemohub");

app.Run();
