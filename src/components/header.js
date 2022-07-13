import { Link } from "gatsby"
import * as React from "react"
import Menu from "./menu"
import { StaticImage } from "gatsby-plugin-image"


const Header = () => {
  return (
  <div className="dark mb-10 border-b">
<div className="navbar">
  <div className="navbar-start">
  <div className="avatar lg:hidden">
      <StaticImage
        className="w-16 h-16 rounded-full"
        alt=""
        src={"../images/iam.webp"}
        formats={["auto", "webp", "avif"]}
      />
    </div>
  
    <div className="navbar  relative hidden lg:flex">
    <div className="logo">
      <div className="w-full rounded-full"> 
       <div className="avatar">
          <div className="w-16 rounded-full">
            <Link key="377" to="/">
              <StaticImage
                className="w-16 rounded-full"
                alt=""
                src={"../images/iam.webp"}
                formats={["auto", "webp", "avif"]}
              />
            </Link>
          </div>
        </div>
       
      </div>
    </div>

  </div>
  </div>

  <div className="navbar-end">
  <Menu/>
    
  </div>
</div>
  </div>    
   )
}
  




export default Header


