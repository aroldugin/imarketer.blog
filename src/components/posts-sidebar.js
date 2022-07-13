import * as React from "react"
import { StaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image" 

const PostsSidebar = () => (

    <StaticQuery 
    query = {graphql`
     query {
      allWpPost(
        limit: 3
      ) {
        nodes {
          date(formatString: "LL")
          id
          excerpt
          content
          slug
          title
          author {
            node {
              name
              description
            }
          }
          categories {
            nodes {
              name
              slug
              icat {
                caticon {
                  localFile {
                    childImageSharp {
                      fluid {
                        base64
                        aspectRatio
                        src
                        srcSet
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      
     }
    `}
    render = {data => (
        <>
          {data.allWpPost.nodes.map((post, node, nodes) => {
          const {slug, id, title, categories, content,  date,  } = post 
          const categ = categories.nodes
          const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid
          var x = content
          const time = 1500
          return (
            <div key={id} className="flex justify-center">
              
              <div className="block text-left p-5">
              <Link key={categ[0].id} to={`/${categ[0].slug}`}>
                    <div className="flex">
                        <Img 
                        fluid={aut} 
                        alt="A corgi smiling happily"
                        className="h-5 w-5 object-cover rounded-full mr-3"
                        />
                        <div>
                        <h6 className="font-bold text-indigo-700 hover:text-pink-700">{categ[0].name}</h6>
                        </div>
                    </div>
                </Link>
                <Link to={`/${categ[0].slug}/${slug}`} >
                <div className="pt-2 mb-4">
                  <h2 className="text-lg font-bold mb-2">{title}</h2>
                  <small className="text-sm">{date} - {Math.round(x.length/time)} минут</small>
                  
                </div>
   
                <button className="text-blue-600">Читать статью →</button>
                </Link>
              </div>
              
            </div>
          )
        })}  

        </>
    )}
    />


)
    



export default PostsSidebar





