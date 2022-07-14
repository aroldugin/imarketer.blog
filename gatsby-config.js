module.exports = {
  siteMetadata: {
    title: `Я-Маркетолог`,
    description: `Жизнь, маркетинг и немного E-Commerce`,
    author: `@cassius`,
    url: "https://imarketer.blog", 
    siteUrl: `https://imarketer.blog`,
    image: "src/images/webpc-passthru3.webp"
  },
  plugins: [
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
          shortname: `imarketer-blog-1`
      }
  },
   `gatsby-plugin-netlify`,
    'gatsby-plugin-postcss',
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `@matiasfha/gatsby-plugin-frontmatter-featured-image`,
      options: {
        image: 'featuredImage'
      },
    },
    
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://back.imarketer.blog/graphql`,
        schema: {
          typePrefix: `Wp`,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
    {
      resolve: "gatsby-source-wordpress-menus",
      options: {
        wordpressUrl: "https://back.imarketer.blog/",
        languages: ["en", "ru"],
        enableWpml: true,
        allowCache: true,
        maxCacheDurationSeconds: 60 * 60 * 24
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
   
  ],
}
