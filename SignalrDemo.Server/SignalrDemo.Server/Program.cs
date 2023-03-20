using SignalrDemo.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

var policyName = "defaultCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(policyName, builder =>
    {
        builder.WithOrigins("https://localhost:4200") // the Angular app url
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors(policyName);
app.MapHub<SignalrDemoHub>("/signalrdemohub");

app.Run();
