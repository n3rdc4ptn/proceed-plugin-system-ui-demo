"use client";

import { useState } from "react";
import { ExtensionPoint } from "proceed-frontend-plugin-system";

export default function Home() {
  const [plugins, setPlugins] = useState<string[]>([]);

  return (
    <div>
      <h1>UI Plugin Demo</h1>

      <ExtensionPoint extensionPoint="demo" />
      <ExtensionPoint extensionPoint="processlistview" />
    </div>
  );
}
