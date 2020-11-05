using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalrDemo.Server.Hubs;

namespace SignalrDemo.Server
{
    // ASP.NET Core apps use a Startup class, which is named Startup by convention. The Startup class includes
    // a Configure() method to create the app's request processing pipeline.  It can also include an optional
    // ConfigureServices() method to configure the app's services. A "service" is a reusable component that provides
    // app functionality. Services are registered in ConfigureServices and consumed across the app via dependency
    // injection (DI) or ApplicationServices. ConfigureServices() and Configure() are called by the ASP.NET Core
    // runtime when the application starts. See this link for more information:
    // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-3.1
    public class Startup
    {
        // The Startup class is created by calling the WebHostBuilderExtensions.UseStartup<TStartup> method on
        // the host builder inside the CreateHostBuilder() in Program.cs.
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // ConfigureServices() is called by the host before the Configure() method and will configure the app's
        // services. By convention, this where configuration options are set, and where services are added the container.
        // This method is optional for the Startup class.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins("http://localhost:4200", "https://mfcallahan.github.io") // the Angular app url
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });

            services.AddControllers();
            services.AddSignalR();
        }

        // Configure() is used to specify how the app responds to HTTP requests. The request pipeline is configured
        // by adding middleware components to an IApplicationBuilder instance. IApplicationBuilder is available to the
        // Configure method(), but it isn't registered in the service container. Hosting creates an IApplicationBuilder
        // and passes it directly to Configure().
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<SignalrDemoHub>("/signalrdemohub");  // the SignalrDemoHub url
            });
        }
    }
}
