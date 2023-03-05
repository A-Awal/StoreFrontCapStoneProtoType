using Application.Products;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct()
        {
            return Ok(await _mediator.Send(new AllProducts.Query { }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            return Ok(await _mediator.Send(new Create.Command { ProductDto = product }));
        }
    }
}
