import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


const Footer = () => {
  return(
    <>
 
 <footer class="footer footer-center  bg-slate-900 text-slate-100 mt-20">
  <div>
  <div className="avatar pt-10">
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
        <div className="mb-5">
        <span>Автор блога <br/>Ролдугин Андрей</span>
        </div>
        <span>Copyright © 2022 - Все права защищены. <br/>Копирование разрешается исключительно с использованием обратной ссылки</span>
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
  
  <div>

  </div>
</footer>

    
      
    </>
  )
}

export default Footer
