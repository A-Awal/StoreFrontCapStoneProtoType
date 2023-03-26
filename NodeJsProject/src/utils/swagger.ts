import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen"

const outputFile = "./swagger_output.yaml";
const endpointsFiles = ["./src/routes.ts"];

const doc = {
    info: {
        title: "Storefront SME's WebApp API",
        description:
            "API documentation for Storefront SME's WebApp API made with expressJs and Swagger",
        version: "1.0.0",
    },
    host: process.env.SWAGGER_HOST,
    basePath: "/",
    schemes: ["https", "http"],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

export const initswagger = (app: Express) => {
    const options: swaggerJsdoc.Options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Storefront SME's WebApp API",
                version: "1.0.0",
                description:
                    "This API documentation for Storefront SME's WebApp API made with expressJs and Swagger",
            },
            server: [
                {
                    url: "https://storefrontsmes-api.amalitech-dev.net",
                    descriptions: "Development server",
                },
            ],
        },
        apis: ["swagger_output.yaml"],
    };

    const specs = swaggerJsdoc(options);
    app.use('/docs', serve, setup(specs, {explorer: true, customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css"}))
};
