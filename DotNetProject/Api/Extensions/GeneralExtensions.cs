using Microsoft.Extensions.DependencyInjection;
using Application.Products;
using MediatR;
using Application.Core;
using FluentValidation.AspNetCore;
using FluentValidation;

namespace API.Extensions
{
    public static class GeneralExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddMediatR(typeof(AllProducts.Handler));
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();


            return services;
        }
    }
}
