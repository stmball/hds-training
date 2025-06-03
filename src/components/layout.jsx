import * as React from "react"

import Navbar from "./Navbar.jsx"
import AuthenticationWindow from "./AuthenticationWindow.jsx"

const Layout = ({ children }) => {

  const [isAuthed, setAuth] = React.useState(false)


  return (
    <>
      {isAuthed ?
        <>
          < Navbar />
          <div className="background-texture min-h-lvh">
            <div className="mx-auto max-w-6xl px-8 py-8">
              <main>{children}</main>
            </div>
          </div >
        </>
        :
        <AuthenticationWindow setAuth={setAuth} />
      }
    </>
  )
}

export default Layout
