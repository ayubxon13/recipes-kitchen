import {Outlet} from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function RootLayouts() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="max-container grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayouts
