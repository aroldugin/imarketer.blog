import * as React from "react"
import '../../src/styles/global.css'
import Layout from "../components/layout"
import Seo from "../components/seo"
import PopularPost from "./popular-post"
import AllPosts from "./all-posts"
import SmallPost from "./small-card-posts"
import TagsIndex from "./tags"


const IndexPage = ({ data }) => {

  
  return (
    <Layout>
      <Seo title="Я-Маркетолог"/>
      <div className="pl-40 pr-20">
      <div class="hero bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
   
          <div>
            <h1 class="text-5xl font-bold">Я - Маркетолог.</h1>
            <p class="py-6 text-lg pr-10">Уже много лет я веду этот блог. Его цели, темы и стиль повествования менялись бесчисленное количество раз, пока я не осознал, что просто хочу писать. Ради самого себя и для тех, кому это действительно интересно.</p>
            <span className="font-bold">Теги блога</span>
            <TagsIndex />
          </div>
        </div>
      </div>
      
      <div className="lg:flex flex-row">
        <div className="basis-6/12">
          <PopularPost />
        </div>
        <div className="basis-4/12">
           <AllPosts />
        </div>
        <div className="basis-3/12">
           <SmallPost/>
        </div>
    </div>
    </div>
    </Layout>
  )
}


export default IndexPage
