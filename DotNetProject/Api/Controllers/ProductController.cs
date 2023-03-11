using Api.Controllers;
using Application.Core;
using Application.Product;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct()
        {
            return HandleResult(await _mediator.Send(new Products.Query { }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            return Ok(await _mediator.Send(new Create.Command { ProductDto = product }));
        }
    }
}
