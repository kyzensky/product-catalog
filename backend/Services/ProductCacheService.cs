namespace EldudkaAPI.Services
{
    public class ProductCacheService : IHostedService
    {
        private readonly CSService _csService;
        private readonly ILogger<ProductCacheService> _logger;
        private readonly Timer _timer;
        private List<CSProduct> _cachedProducts = new();
        private readonly object _lockObject = new();
        private DateTime _lastUpdate = DateTime.MinValue;
        private readonly TimeSpan _cacheUpdateInterval = TimeSpan.FromMinutes(5);

        public ProductCacheService(CSService csService, ILogger<ProductCacheService> logger)
        {
            _csService = csService;
            _logger = logger;
            _timer = new Timer(UpdateCache, null, TimeSpan.Zero, _cacheUpdateInterval);
        }

        private async void UpdateCache(object? state)
        {
            try
            {
                _logger.LogInformation("Updating product cache...");
                var products = await _csService.GetAllProducts();
                
                lock (_lockObject)
                {
                    _cachedProducts = products.ToList();
                    _lastUpdate = DateTime.UtcNow;
                }
                
                _logger.LogInformation($"Product cache updated. Total products: {_cachedProducts.Count}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product cache");
            }
        }

        public IEnumerable<CSProduct> GetCachedProducts()
        {
            lock (_lockObject)
            {
                return _cachedProducts.ToList();
            }
        }

        public DateTime GetLastUpdateTime()
        {
            lock (_lockObject)
            {
                return _lastUpdate;
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("ProductCacheService started");
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Dispose();
            _logger.LogInformation("ProductCacheService stopped");
            return Task.CompletedTask;
        }
    }
}

