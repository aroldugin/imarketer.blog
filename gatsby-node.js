const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve('./src/templates/single-post.js');
  const BlogCategoryTemplate = path.resolve('./src/templates/category.js');
  const PageTemplate = path.resolve('./src/templates/page.js');
  const TagTemplate = path.resolve('./src/templates/tag.js');


  const result = await graphql(`
    {
      allWpPost {
        nodes {
            slug
            id
            categories {
              nodes {
                id
                slug
              }
            }
           }
      }
      allWpTag {
        nodes {
          slug
          id
        }
      }
      allWpPage {
        nodes {
            slug
            id
           }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  
  const BlogPosts = result.data.allWpPost.nodes;
  BlogPosts.forEach((post, nodes) => {
    const categ = post.categories.nodes
   
    createPage({
      path: `/${categ[0].slug}/${post.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.id,
      },
    });
  })

  const BlogTag = result.data.allWpTag.nodes;
  BlogTag.forEach((tag) => {
   
    createPage({
      path: `/tag/${tag.slug}`,
      component: TagTemplate,
      context: {
        id: tag.id,
      },
    });
  })

  const BlogPage = result.data.allWpPage.nodes;
  BlogPage.forEach((page, nodes) => {
   
    createPage({
      path: `/${page.slug}`,
      component: PageTemplate,
      context: {
        id: page.id,
      },
    });
  })
  
  const BlogCategory = result.data.allWpPost.nodes;
  BlogCategory.forEach((post, nodes) => {
      const category = post.categories.nodes
      createPage({
        path: `/${category[0].slug}/`,
        component: BlogCategoryTemplate,
        context: {
          id: category[0].id,
        },
      });
  });
};