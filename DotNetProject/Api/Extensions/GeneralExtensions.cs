using Microsoft.Extensions.DependencyInjection;
using MediatR;
using Application.Core;
using FluentValidation.AspNetCore;
using FluentValidation;
using Application.Product;

namespace API.Extensions
{
    public static class GeneralExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddMediatR(typeof(Products.Handler));
            services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();


            return services;
        }
    }
}
