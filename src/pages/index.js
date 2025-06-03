import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.jsx"
import ThemeCard from "../components/ThemeCard.jsx";

const BlogIndex = ({ data }) => {
  const themes = data.allTheme.nodes;

  return (
    <Layout>
      {/* Hero themes first */}
      <div className="flex gap-4 flex-col">
        {themes.filter((item) => item.hero).map((theme) => {
          return (
            <ThemeCard theme={theme} />
          )
        })}
      </div>
      <h1 className="text-4xl font-bold align-middle uppercase py-5 w-full text-center text-slate-900">More themes</h1>
      <ol className="grid lg:grid-cols-2 gap-4">
        {themes.filter((item) => !item.hero).map(theme => {

          return (
            <ThemeCard theme={theme} />
          )
        })}
      </ol>
    </Layout >
  )
}

export default BlogIndex


export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allTheme {
      nodes {
        id
        hero 
        description 
        title
        top_text
        suitability
        guides {
          title
        }
        
        fields {
          slug
        }
      }
    } 
  }
`
