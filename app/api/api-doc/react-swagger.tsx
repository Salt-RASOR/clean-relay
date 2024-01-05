"use client";
import React from "react";
import 'swagger-ui-react/swagger-ui.css'
import SwaggerUI from "swagger-ui-react";

type reactSwaggerProps = {
  spec: Record<string, any>;
};
const reactSwagger = ({ spec }: reactSwaggerProps) => {
  return <SwaggerUI spec={spec} />;
};

export default reactSwagger;
