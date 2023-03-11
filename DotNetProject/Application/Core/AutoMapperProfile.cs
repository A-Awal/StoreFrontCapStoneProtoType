using Application.Product;
using AutoMapper;

namespace Application.Core
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Domain.Product, ProductDto>();
            CreateMap<ProductDto, Domain.Product>();
        }

       
    }
}
