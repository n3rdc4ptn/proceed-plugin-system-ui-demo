"use client";

import { useState } from "react";
import { ExtensionPoint } from "proceed-frontend-plugin-system";

export default function Home() {
  return (
    <div>
      <h1>UI Plugin Demo</h1>

      <ExtensionPoint extensionPoint="demo" data={null} />
    </div>
  );
}
