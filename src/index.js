import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
createRoot(container).render(
	<React.StrictMode>
		<App />
		<Toaster />
	</React.StrictMode>
);
