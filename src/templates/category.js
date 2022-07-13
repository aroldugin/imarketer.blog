import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {GatsbyImage } from "gatsby-plugin-image"
import Img from "gatsby-image" 


const BlogCategoryTemplate = ({ data }) => (
        <Layout>
          <Seo 
          title={data.wpCategory.name}
          description={data.wpCategory.description} 
          />
          <div className="max-w-3xl mx-auto">
          <h1>{data.wpCategory.name}</h1>
          <p>{data.wpCategory.description}</p>
          
          {data.allWpPost.nodes.map((post, node, nodes) => {
          const {slug, id, title, categories, featuredImage, content, date, excerpt } = post 
          let img = featuredImage.node.localFile.childImageSharp.gatsbyImageData
          const categ = categories.nodes
          const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid
          var x = content
          const time = 1500
          return (
            <div key={id} className="flex justify-center">
              
              <div className="block text-left mb-5 mt-10 pr-10">
              <Link to={`/${categ[0].slug}/${slug}`} >
                    <div className="flex">
                        <Img 
                        fluid={aut} 
                        alt="A corgi smiling happily"
                        className="h-10 w-10 object-cover rounded-full mr-3"
                        />
                        <div>
                        <h6 className="font-bold">{categ[0].name}</h6>
                        <small className="text-sm">{date} - {Math.round(x.length/time)} минут</small>
                        </div>
                    </div>
            
                <div className="pt-4 mb-5">
                  <h2 className="text-xl font-bold mb-2">{title}</h2>
                  <p className="text-ls mb-2"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                  >
                  
                  </p>
                  <GatsbyImage className="rounded-lg" image={img} alt={title} />
                </div>
                <button className="text-blue-600">Читать статью →</button>
                </Link>
              </div>
            </div>
          )
        })}  
        </div>
          
        </Layout>
      
    )

export default BlogCategoryTemplate


export const query = graphql`
query($id: String) {
  wpCategory (id: {eq: $id}){
    name
    description
  }
  allWpPost (filter: {categories: {nodes: {elemMatch: {id: {eq: $id}}}}})  {
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
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(formats: WEBP, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`