import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostsSidebar from "../components/posts-sidebar"


const PageTemplate = ({ data }) => {
   

  
  return (
<Layout>
   

    <div className="flex flex-row">
        <div className="basis-10/12">
        <div className="p-10 pt-0">
     
         
    <div className="content-page max-w-3xl mx-auto">
    <div className="header-post mt-5">
     <h1>{data.wpPage.title}</h1>
   

    </div>
    <div className="content max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: data.wpPage.content }}
    /> 
    </div>
    </div>
        </div>

        <div className="basis-2/12 static">
          <div className="fixed max-w-sm"><PostsSidebar/></div>
        </div>
      </div>
    
    
  </Layout>
  )

}
  
export default PageTemplate

export const query = graphql`
  query($id: String) {
    wpPage(id: { eq: $id }) {
     content
      title
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
              (
                formats: [WEBP]
                placeholder: BLURRED
                width: 1000
              )
            }
          }
        }
      }
  }
}
`
