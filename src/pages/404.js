import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.jsx"

const NotFoundPage = () => {

  return (
    <Layout>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}


export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
