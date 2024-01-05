import { createSwaggerSpec } from "next-swagger-doc";
import path from "path";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Clean Relay API",
        version: "1.0",
      },
      security: [],
    },
  });
  return spec;
};
