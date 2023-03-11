using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Domain;

namespace Application.Products
{
    public class AllProducts
    {
        public class Query:IRequest<List<ProductDto>>
        {

        }

        public class Handler: IRequestHandler<Query, List<ProductDto>>
        {
            private readonly AppDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler( AppDataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                 List<ProductDto> products = await _dataContext.Products
                    .Select(p => _mapper.Map<ProductDto>(p))
                    .ToListAsync();
                
                return products;
            }
        }
    }
}
