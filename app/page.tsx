"use client";

import { useEffect, useState } from "react";
import { DynamicComponent } from "../lib/components/dynamic/DynamicComponent";
import { environment } from "../lib/environment";

export default function Home() {
  const [plugins, setPlugins] = useState<string[]>([]);

  // Dynamically fetch plugins from the server one Time on first render
  useEffect(() => {
    fetch(`${environment.pluginServerUrl}/plugins/`)
      .then((response) => response.json())
      .then((data) => setPlugins(data));
  }, []);

  return (
    <div>
      <h1>UI Plugin Demo</h1>

      {plugins.map((plugin, index) => (
        <div key={index} className="my-4 p-4">
          <p className="text-xl">{plugin}</p>
          <div className="border-black rounded-lg border-2 p-2">
            <DynamicComponent
              url={`${environment.pluginServerUrl}/plugins/${plugin}/remoteEntry.js`}
              scope={plugin}
              module="./Module"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
