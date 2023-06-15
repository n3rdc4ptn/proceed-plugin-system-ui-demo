"use client";

import { injectScript } from "@module-federation/nextjs-mf/utils";
import React, { ComponentType } from "react";

interface Container {
  init(shareScope: string): void;

  get(module: string): () => any;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

function loadModule(url: string) {
  return injectScript({
    url,
    global: "remote",
  });
  // try {
  //   return import(/* webpackIgnore:true */ url);
  // } catch (e) {}
  // return null;
}

function loadComponent(remoteUrl: string, scope: string, module: string) {
  return async () => {
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__("default");
    const container: Container = await loadModule(remoteUrl);
    console.log(container);
    // eslint-disable-next-line no-undef
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

const componentCache = new Map();
export const useFederatedComponent = (
  remoteUrl: string,
  scope: any,
  module: string
) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState<ComponentType | null>(null);

  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (!Component) {
      const Comp = React.lazy(loadComponent(remoteUrl, scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, key]);

  return { Component };
};
