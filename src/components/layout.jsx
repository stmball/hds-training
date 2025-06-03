import * as React from "react"

import Navbar from "./Navbar.jsx"
import AuthenticationWindow from "./AuthenticationWindow.jsx"

const Layout = ({ children }) => {

  const [isAuthed, setAuth] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      setAuth(true)
    }
  })

  const save_auth = () => {
    localStorage.setItem("logged_in", true)
    setAuth(true)
  }

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
        <AuthenticationWindow save_auth={save_auth} />
      }
    </>
  )
}

export default Layout
