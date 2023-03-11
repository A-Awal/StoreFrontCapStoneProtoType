using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.Product
{
    public class Create
    {
        public class Command : IRequest<string>
        {
            private ProductDto productDto;

            public ProductDto ProductDto { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ProductDto).SetValidator(new ProductValidator());
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly AppDataContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = _mapper.Map<Domain.Product>(request.ProductDto);

                _context.Products.Add(product);

                var success = await _context.SaveChangesAsync()>0;

                if (success) return "Product is updated";
                return "Please try Again";
            }
        }


    }
}
