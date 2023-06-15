"use client";

import { useState } from "react";
import { DynamicComponent } from "../lib/components/dynamic/DynamicComponent";
import { environment } from "../lib/environment";

export default async function Home() {
  const [plugins, setPlugins] = useState<string[]>(["plugin"]);

  return (
    <div>
      <h1>UI Plugin Demo</h1>

      {plugins.map((plugin, index) => (
        <div key={index}>
          <p>{plugin}</p>
          <DynamicComponent
            url={`${environment.pluginServerUrl}/plugins/${plugin}/remoteEntry.js`}
            scope="mainpage"
            module="./Module"
          />
        </div>
      ))}
    </div>
  );
}
