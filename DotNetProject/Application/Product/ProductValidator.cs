using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Product
{
    public class ProductValidator: AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            RuleFor(x => x.ProductName).NotEmpty();
            RuleFor(x => x.ProductDescription).NotEmpty();
            RuleFor(x => x.ProductCategory).NotEmpty();
            RuleFor(x => x.Unit).NotNull();
            RuleFor(x => x.Quantity).NotEmpty();
            RuleFor(x => x.StoreId).NotNull();
        }
    }
}
