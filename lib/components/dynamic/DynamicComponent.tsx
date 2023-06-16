"use client";

import * as React from "react";
import { useFederatedComponent } from "../../dynamic-module";

export const DynamicComponent = ({
  url,
  scope,
  module,
}: {
  url: string;
  scope: string;
  module: string;
}) => {
  const { Component: DynComponent } = useFederatedComponent(url, scope, module);

  if (!DynComponent) {
    return <div>Loading...</div>;
  }

  return <DynComponent hallo={scope} />;
};
