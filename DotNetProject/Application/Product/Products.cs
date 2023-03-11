using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Application.Core;

namespace Application.Product
{
    public class Products
    {
        public class Query:IRequest<Result<List<ProductDto>>>
        {

        }

        public class Handler: IRequestHandler<Query, Result<List<ProductDto>>>
        {
            private readonly AppDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler( AppDataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<List<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                 List<ProductDto> products = await _dataContext.Products
                    .Select(p => _mapper.Map<ProductDto>(p))
                    .ToListAsync();
                
                return Result<List<ProductDto>>.Success(products);
            }
        }
    }
}
