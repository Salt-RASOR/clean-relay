"use client";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

type reactSwaggerProps = {
  spec: Record<string, any>;
  url?: string;
};
const reactSwagger = ({ spec, url }: reactSwaggerProps) => {
  if (process.env.NODE_ENV === "development") {
    return <SwaggerUI spec={spec} />;
  } else {
    return <SwaggerUI url={url} />;
  }
};

export default reactSwagger;
