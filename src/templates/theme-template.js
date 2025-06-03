import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const ThemeTemplate = ({
  data,
  location,
}) => {

  let theme = data.theme
  console.log(theme)
  let followons = theme.followons

  return (
    <Layout location={location}>
      <div className="flex flex-col gap-8">
        <section className="p-4 bg-white rounded-md shadow-md">
          <h1 className="font-bold text-4xl text-slate-900">{theme.title}</h1>
          <p className="text-slate-700">{theme.description}</p>
        </section>
        <h1 className="font-bold text-4xl uppercase self-center text-slate-900">Guides</h1>
        {theme.guides.map((guide) => {
          return (<Link to={`/guides/${guide.slug}`} >
            <section className="p-4 min-h-24 bg-white rounded-md shadow-md card text-slate-900">
              <h1 className="font-bold text-2xl text-slate-900 border-b border-b-slate-200">{guide.title}</h1>
              <p className="text-slate-700 py-2 text-xs">{guide.description}</p>
            </section>
          </Link>)
        })}
        {followons &&
          (<>
            <h1 className="font-bold text-4xl uppercase self-center text-slate-900">More Resources</h1>
            <p className="text-slate-900">Want to go further? Below are some additional resources if you want to learn more.</p>
            {followons.map((followon) => {
              return (<Link to={followon.slug}>
                <section className="p-4 min-h-24 bg-white rounded-md shadow-md card text-slate-900">
                  <h1 className="font-bold text-2xl">{followon.title}</h1>
                  <p className="text-slate-700">{followon.description}</p>
                </section>
              </Link>)
            })}
          </>)
        }
      </div>
    </Layout >
  )
}

export default ThemeTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String
  ) {
    theme(id: { eq: $id }) {
      id
      title
      description
      suitability
      guides {
        title 
        description
        slug
        icons
        }
      followons {
        title 
        description
        slug
        }
      }
    }
`
