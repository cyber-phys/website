import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    //mode: 'mdx',
    remarkPlugins: [
      'remark-gfm', 'remark-smartypants',
      'remark-math' 
    ],
    rehypePlugins: [
      //'rehype-slug', < needed only prior beta.22
      'rehype-mathjax' 
    ]
  }
});