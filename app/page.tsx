"use client";

import { useEffect, useState } from "react";
import { DynamicComponent } from "proceed-frontend-plugin-system";
import { environment } from "../lib/environment";

export default function Home() {
  const [plugins, setPlugins] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${environment.pluginServerUrl}/plugins/`)
      .then((response) => response.json())
      .then((data) => setPlugins(data));
  }, []);

  return (
    <div>
      <h1>UI Plugin Demo</h1>

      {/* <DynamicComponent
        url={`${environment.pluginServerUrl}/plugins/com.example.plugin1/remoteEntry.js`}
        scope="Plugin1"
        module="./Module"
      /> */}

      {plugins.map((plugin, index) => (
        <div key={index} className="my-4 p-4">
          <p className="text-xl">{plugin.name}</p>
          <div className="border-black rounded-lg border-2 p-2">
            <DynamicComponent
              url={`${environment.pluginServerUrl}/plugins/${plugin.bundle}/remoteEntry.js`}
              scope={plugin.name}
              module="./Module"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
