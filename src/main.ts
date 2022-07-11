import App from "./App.svelte";
import "./stylesheets/normalize.css";
import "./stylesheets/main.pcss";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
