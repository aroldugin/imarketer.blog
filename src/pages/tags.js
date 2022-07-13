import { Link, graphql , StaticQuery} from "gatsby"
import * as React from "react"

const TagsIndex = () => (
<StaticQuery
 query = {graphql`
 query {
    allWpTag {
      nodes {
        name
        slug
        id
      }
    }
  }
 

 
 `}
 render = {data => (
     
    <div className="tagsindex mt-4">
     {data.allWpTag.nodes.map((tag) => {
         const { name, id } = tag
          return (
            <Link key={id} to={`/tag/${tag.slug}`} className="btn btn-outline btn-sm mr-2 mb-2">
            {name}
        </Link>
         )
     })}
  

     
     </div>
 )}
/>
    
)

export default TagsIndex
