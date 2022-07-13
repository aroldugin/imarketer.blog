import * as React from "react"
import { StaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import {GatsbyImage, getImage } from "gatsby-plugin-image"
import Img from "gatsby-image" 

const PopularPost = () => (

    <StaticQuery 
    query = {graphql`
    query {
        allWpPost (filter: {categories: {nodes: {elemMatch: {slug: {in: ["life", "works"]}}}}}, limit: 5){
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
                  id
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
              featuredImage {
                node {
                  localFile {
                    childImageSharp {
                      gatsbyImageData( formats: WEBP, placeholder: BLURRED)
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
       
          const {slug, id, title, categories, featuredImage, content, date, excerpt } = post
          let img = getImage(featuredImage.node.localFile.childImageSharp.gatsbyImageData)
          const categ = categories.nodes
          const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid
          var x = content
          const time = 1500      
    
          return (
            <div key={id} class="flex justify-center">
              
              <div class="block text-left mb-5 mt-10 pr-10">
             <Link kay={categ[0].id} to={`/${categ[0].slug}`}>
                <div class="flex">
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
                <Link kay={id} to={`/${categ[0].slug}/${slug}`} >
                <div class="pt-4 mb-5">
                  <h2 className="text-xl2 font-bold mb-2">{title}</h2>
                  <p class="text-sm mb-2"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                  >
                  
                  </p>
                  <GatsbyImage class="rounded-lg" image={img} alt={title} />
                </div>
                <button class="text-blue-600">Читать статью →</button>

                </Link>
                
              </div>
             
            </div>
          )
          

        })}  

        </>
    )}
    />


)
    



export default PopularPost





