import React, { useContext } from "react"
import SEO from "./SEO"
import GlobalContext from "../contexts/global_context"

const Layout = ({ children }) => {
  const isDarkTheme = useContext(GlobalContext)
  return (
    <>
      <SEO />
      <div
        className={`flex flex-col min-h-screen ${
          isDarkTheme ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default Layout
