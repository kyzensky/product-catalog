using Microsoft.AspNetCore.Mvc;
using EldudkaAPI.Services;

namespace EldudkaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductCacheService _cacheService;

        public ProductController(ProductCacheService cacheService)
        {
            _cacheService = cacheService;
        }

        private IEnumerable<ProductDTO> MapAndSortProducts(IEnumerable<CSProduct> products)
        {
            return products
                .Select(p => ProductMapper.Map(p))
                .OrderByDescending(p => p.Availability?.Sum(a => a.Count) ?? 0)
                .ToList();
        }

        [HttpGet("GetList")]
        public IEnumerable<ProductDTO> GetList([FromQuery] int page = 1, [FromQuery] int pageSize = 16)
        {
            var products = _cacheService.GetCachedProducts();
            var mapped = MapAndSortProducts(products);
            
            return mapped.Skip((page - 1) * pageSize).Take(pageSize);
        }

        [HttpGet("Search")]
        public IEnumerable<ProductDTO> Search([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 16)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return GetList(page, pageSize);
            }

            var products = _cacheService.GetCachedProducts();
            var lowerQuery = query.ToLower().Trim();
            
            var filtered = products.Where(p =>
                (p.Name?.ToLower().Contains(lowerQuery) ?? false) ||
                (p.Description?.ToLower().Contains(lowerQuery) ?? false)
            );

            var mapped = MapAndSortProducts(filtered);
            
            return mapped.Skip((page - 1) * pageSize).Take(pageSize);
        }

        [HttpGet("GetByCategory")]
        public IEnumerable<ProductDTO> GetByCategory([FromQuery] string category, [FromQuery] int page = 1, [FromQuery] int pageSize = 16)
        {
            if (string.IsNullOrWhiteSpace(category))
            {
                return GetList(page, pageSize);
            }

            var products = _cacheService.GetCachedProducts();
            var lowerCategory = category.ToLower().Trim();
            var categoryPrefix = lowerCategory.Length >= 3 ? lowerCategory.Substring(0, 3) : lowerCategory;
            
            var filtered = products.Where(p =>
                (p.Name?.ToLower().Contains(categoryPrefix) ?? false)
            );

            var mapped = MapAndSortProducts(filtered);
            
            return mapped.Skip((page - 1) * pageSize).Take(pageSize);
        }

        [HttpPost("GetByIds")]
        public IEnumerable<ProductDTO> GetByIds([FromBody] Guid[] ids)
        {
            var products = _cacheService.GetCachedProducts();
            var filteredData = products.Where(p => ids.Contains(p.UUID));
            return MapAndSortProducts(filteredData);
        }

        [HttpGet("GetById")]
        public ActionResult<ProductDTO> GetById(Guid id)
        {
            var products = _cacheService.GetCachedProducts();
            var product = products.FirstOrDefault(p => p.UUID == id);
            
            if (product == null)
            {
                return NotFound($"Product with id {id} not found");
            }

            return ProductMapper.Map(product);
        }
    }
}
