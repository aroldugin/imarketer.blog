import * as React from "react"
import { Disqus } from 'gatsby-plugin-disqus';
import { graphql, Link } from "gatsby"
import { StaticQuery } from "gatsby"


const Comments = () => (
<StaticQuery 
    query = {graphql`
    query {
      allWpPost {
        nodes {
          slug
          categories {
            nodes {
              slug
            }
          }
          title
          id
        }
      }
    }
    `}
    render = {data => (
        <>
          {data.allWpPost.nodes.map((post, node, nodes) => {
          const {slug, id, title, categories } = post 
          const categ = categories.nodes
          const url = `/${categ[0].slug}/${slug}`
          const idis = id

          return (
            <Disqus
                config= {{
                    url: url,
                    identifier: idis,
                    title: title,
                }}
            />
          )
        })}  

        </>
    )}
    />
)



export default Comments
