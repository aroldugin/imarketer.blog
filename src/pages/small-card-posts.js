import * as React from "react"
import { StaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image" 

const SmallPost = () => (

    <StaticQuery 
    query = {graphql`
     query {
      allWpPost(
        filter: {categories: {nodes: {elemMatch: {slug: {eq: "tools"}}}}}
        limit: 5
      ) {
        nodes {
          date(formatString: "LL", locale: "ru")
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
              
              <div className="block text-left mb-5 mt-10">
              <Link key={categ[0].id} to={`/${categ[0].slug}`}>
                    <div className="flex">
                        <Img 
                        fluid={aut} 
                        alt="A corgi smiling happily"
                        className="h-10 w-10 object-cover rounded-full mr-3"
                        />
                        <div>
                        <h6 className="font-bold text-indigo-700 hover:text-pink-700">{categ[0].name}</h6>
                        <small className="text-sm">{date} - {Math.round(x.length/time)} минут</small>
                        </div>
                    </div>
                </Link>
                <Link to={`/${categ[0].slug}/${slug}`} >
                <div className="pt-4 mb-5">
                  <h2 className="text-xl font-bold mb-2">{title}</h2>                  
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
    



export default SmallPost





