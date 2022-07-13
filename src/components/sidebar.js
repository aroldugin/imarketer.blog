import * as React from "react"
import telegram from "../images/telegram.png"
import author from "../images/002.png"

const Sidebar = () => ( 
<div className='relative'>
  <div className='fixed w-64'>
  <div className="relative hidden lg:flex">
  
    <div className="avatar pt-5 p-3 fixed top-20">
      <div className="w-10 rounded-full">
        <img src={telegram} />
      </div>
    </div>

  </div>
</div>
</div>

)
  



export default Sidebar





/* <StaticQuery
    query={graphql`
      {
        allSitePage {
          edges {
            node {
              id
              path
            }
          }
        }
      }
    `}
    render={({ allSitePage: { edges } }) => (
      <ul>
        {edges.map(({ node: { id, path } }) => (
          <li key={id}>
            <Link to={path}>{id}</Link>
          </li>
        ))}
      </ul>
    )} 
  />*/