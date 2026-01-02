namespace EldudkaAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(
                    "AllowAll",
                    policy =>
                    {
                        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                    }
                );
            });

            builder.Services.AddControllers();

            builder.Services.AddSingleton<CSService>();
            builder.Services.AddSingleton<Services.ProductCacheService>();
            builder.Services.AddHostedService(provider => provider.GetRequiredService<Services.ProductCacheService>());

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}
