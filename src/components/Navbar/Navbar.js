import Darkmode from "./Darkmode"
import Logo from "./Logo"
import Profile from "./Profile"
import SearchBar from "./SearchBar"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container sm:px-12 lg:px-24 flex items-center justify-between mx-auto px-6 py-3 gap-4">
        
        <Logo />

        <div className="hidden sm:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <Darkmode/>
          <Profile/>
        </div>
      </div>

      <div className="sm:hidden px-6 pb-3">
        <SearchBar />
      </div>
    </nav>
  )
}

export default Navbar
