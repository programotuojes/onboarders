import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [
        autoprefixer,
        postcssNesting
      ],
    },
  }),
};
