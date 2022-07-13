import * as React from "react"
import { StaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"

const Menu = () => (

    <StaticQuery 
    query = {graphql`
     query {
        wpMenu(locations: { eq: GATSBY_HEADER_MENU }) {
            menuItems {
              nodes {
                id
                label
                title
                path
                parentId
              }
            }
          }
     }
    `}
    render = {data => (
        <ul className="menu menu-horizontal p-0 hidden lg:flex font-bold">

        {data.wpMenu.menuItems.nodes.map((item) => {
            const { label, path, id } = item

            return (
                <li><Link key={id} to={path}>{label}</Link></li>
            )
        })}

</ul>
    )}
    />


)
    



export default Menu





