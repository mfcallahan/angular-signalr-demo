using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SignalrDemo.Server
{
    public static class Program
    {
        // This method is the application entry point; Main() is called when the app is started.
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        // ASP.NET Core apps configure and launch a host which responsible for app startup and lifetime management.
        // At a minimum, the host configures a server and a request processing pipeline. The host can also set up
        // logging, dependency injection, and configuration. See this link for more information:
        // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/web-host?view=aspnetcore-3.1
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
    }
}
