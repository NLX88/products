import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
            
        ],
        info:{
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpect = swaggerJSDoc(options)

export default swaggerSpect