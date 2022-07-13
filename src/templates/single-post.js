import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import PostsSidebar from "../components/posts-sidebar"
import Img from "gatsby-image" 
import { Disqus } from 'gatsby-plugin-disqus';
import Author from "../components/author"


const BlogPostTemplate = ({ data }) => {
  var x = data.wpPost.content
  const time = 1500

  return (
<Layout>
  

    <div className="flex flex-row">

        <div className="basis-9/12">
        
     
         
    <div className="content-page">
    <div className="header-post max-w-3xl mx-auto">
    <div className="meta mb-5">
       
          <div className="flex max-w-3xl">
            <Img 
              fluid={data.wpPost.categories.nodes[0].icat.caticon.localFile.childImageSharp.fluid} 
              alt="A corgi smiling happily"
              className="h-6 w-6 object-cover rounded-full mr-3"
            />
          <div>
            <h6 className="font-bold">
            <Link key={data.wpPost.categories.nodes[0].id} to={`/${data.wpPost.categories.nodes[0].slug}`}>{data.wpPost.categories.nodes[0].name}</Link> -
              <span className="text-sm"> {data.wpPost.date} </span> - 
              <span className="text-sm"> Читать {Math.round(x.length/time)} минут</span>
            </h6>
          </div>
          </div>
        
      </div>
      <h1>{data.wpPost.title}</h1>
      
      <GatsbyImage 
      className="rounded-lg imgpost mt-10" 
      image={getImage(data.wpPost.featuredImage.node.localFile.childImageSharp.gatsbyImageData)}
      alt="{data.wpPost.title}" />
   
      <div
            className="text-xl"
            dangerouslySetInnerHTML={{ __html: data.wpPost.excerpt }}/>
        <div className="content text-lg"
            dangerouslySetInnerHTML={{ __html: data.wpPost.content }}
        />
      
      <div className="comments mt-10">
    <Disqus
        config= {{
        url: data.wpPost.slug,
        identifier: data.wpPost.id,
        title: data.wpPost.title,
      }}
            />
    </div>
    <div>
    </div>
    </div>
    </div>
        </div>

        <div className="basis-3/12 static">
          <div className="fixed max-w-sm">
            <Author />
            <PostsSidebar/>
          </div>
        </div>
      </div>
   
    
  </Layout>
  )

}
  
export default BlogPostTemplate

export const query = graphql`
  query($id: String) {
    wpPost(id: { eq: $id }) {
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
      date(formatString: "LL", locale: "ru")
      content
      excerpt
      title
      author {
        node {
          avatar {
            url
          }
          name
          description
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: DOMINANT_COLOR, formats: [AUTO, AVIF, WEBP, JPG], width: 1200)
            }
          }
        }
      }
  }
}
`
