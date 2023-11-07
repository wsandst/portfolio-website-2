import { defineConfig } from "tinacms";

// Follow this for setup https://tina.io/blog/using-tinacms-with-nextjs/

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "8567b369-f7ea-4dba-bbff-80db027e884d", // Get this from tina.io
  token: "fa13b0b3cd99f1ba3a1a7d91532f62b2de00bfd4", // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "content/project",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "cover",
            label: "Cover Image",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug URL",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date of Completion",
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD',
              parse: (value) => value && value.format('YYYY-MM-DD'),
            },
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "aim",
            label: "Aim",
            required: true,
          },
          {
            type: "string",
            name: "authors",
            label: "Author List",
            required: false,
          },
          {
            type: "string",
            name: "github",
            label: "Github Link",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
      },
    ],
  },
});
