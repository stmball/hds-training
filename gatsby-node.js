const path = require(`path`);
const fs = require(`fs`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Define the template for blog post
const guideTemplate = path.resolve(`./src/templates/guide-template.js`)
const themeTemplate = path.resolve(`./src/templates/theme-template.js`)

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // First, create the guides
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      allTheme {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  const guides = result.data.allMarkdownRemark.nodes

  guides.forEach((guide) => {
    createPage({
      path: guide.fields.slug,
      component: guideTemplate,
      context: {
        id: guide.id,
      },
    })
  })

  // Then, create the themes 
  const themes = result.data.allTheme.nodes

  themes.forEach((theme) => {
    createPage({
      path: theme.fields.slug,
      component: themeTemplate,
      context: {
        id: theme.id,
      },
    })
  })


}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = `guides${createFilePath({ node, getNode })}`

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `Theme`) {
    const value = node.slug;

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {

  const { createNode } = actions

  const themeDir = path.resolve(__dirname, "content/themes")

  fs.readdir(themeDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const filePath = path.join(themeDir, file);

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(fileContents);

      const nodeId = createNodeId(`json-${file}`);
      const nodeContent = JSON.stringify(jsonData);

      const nodeData = {
        ...jsonData,
        id: nodeId,
        slug: slugify(file.slice(0, -4)),
        internal: {
          type: 'Theme',
          content: nodeContent,
          contentDigest: createContentDigest(jsonData),
        }
      }

      createNode(nodeData)
    })

  })


}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      siteUrl: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      icons: [String]
    }

    type Fields {
      slug: String
    }

    type Theme implements Node {
      top_text: String
      title: String
      hero: Boolean
      description: String 
      suitability: String 
      guides: [Guide]
      followons: [Guide]
    }

    type Guide {
      title: String 
      description: String 
      slug: String
      icons: [String]
    }
  `)
}
