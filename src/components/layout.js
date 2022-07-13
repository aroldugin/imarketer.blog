import * as React from "react"
import "./layout.css"
import Header from "./header"
import Footer from "./footer"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"


const Layout = ({ children }) => {

return ( 
  <>
  <div className="page">
  <div className="px-4">
  <Header/>
   <div className="flex flex-row">
   <div className="static">
      <div class="fixed ml-10 top-32">
     <div className="mb-10">
        <StaticImage
          src='../images/social/minimal/home.png'
          formats={["auto"]}
          alt='@imarketer'
          className="w-5 h-5"
        />
     </div>
     <div className="mb-10">
     <StaticImage
          src='../images/social/minimal/notification.png'
          formats={["auto"]}
          alt='@imarketer'
          className="w-5 h-5"
        />
     </div>
     
     <div className="mb-5">
       <Link key="3" to="https://t.me/iam_marketer" target="_blank">
     <StaticImage
          src='../images/social/minimal/telegram.png'
          formats={["auto"]}
          alt='@imarketer'
          className="w-5 h-5 online placeholder"
        />
       </Link>
     </div>
     

      </div> 
      
      </div>
    <div className="basis-full pt-0">
    { children }
    </div>
  </div>
  </div>
</div>
 <Footer/>
</>
  )
}
export default Layout

