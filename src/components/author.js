import {graphql , StaticQuery} from "gatsby"
import {StaticImage } from "gatsby-plugin-image"

import * as React from "react"

const Author = () => (
<StaticQuery
 query = {graphql`
 query {
    wpUser(id: {eq: "dXNlcjox"}) {
      id
      name
      description
      avatar {
        url
      }
    }
  }
 
 `}
 render = {data => (
     
    <div className="p-5">
                <div class="avatar online">
                <div class="w-24 rounded-full">
                <img 
                    className="h-10 w-10 object-cover rounded-full mr-3"
                    src={data.wpUser.avatar.url}
                    alt=""/>
                </div>
                </div>

                <div>
                    <h6 className="font-bold text-lg">{data.wpUser.name}</h6>
                    <span className="text-sm">{data.wpUser.description}</span>
                    <div className="mt-5">
                    <StaticImage
                        src='../images/social/telegram.png'
                        formats={["auto"]}
                        alt='@imarketer'
                        className="w-7 h-7 mr-2"
                    />
                    <StaticImage
                        src='../images/social/facebook.png'
                        formats={["auto"]}
                        alt='@imarketer'
                        className="w-7 h-7 mr-2"
                    />
                    <StaticImage
                        src='../images/social/instagram.png'
                        formats={["auto"]}
                        alt='@imarketer'
                        className="w-7 h-7 mr-2"
                    />
                    <StaticImage
                        src='../images/social/linkedin.png'
                        formats={["auto"]}
                        alt='@imarketer'
                        className="w-7 h-7 mr-2"
                    />
                    </div>
                </div>
                </div>
         
 )}
/>
    
)

export default Author
