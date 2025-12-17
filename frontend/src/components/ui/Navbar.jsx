import { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import logo from '../../assets/images/Logo.png';
import heart from '../../assets/images/heart.svg';
import profile from '../../assets/images/profile.svg';
import cart from '../../assets/images/cart.svg';
import toast from 'react-hot-toast';

export default function Navbar({ NumCartItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState();
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  console.log(NumCartItems)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        event.target.getAttribute('aria-label') !== 'Search'
      ) {
        setSearchOpen(false);
      }
      if(
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ){
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, searchOpen, profileOpen]);

  // useEffect(() => {
  //   document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  // }, [menuOpen]);

  // useEffect(() => {
  //   document.body.style.overflow = profileOpen ? 'hidden' : 'auto';
  // }, [profileOpen]);

  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  
  const Logout=()=>{
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setProfileOpen(false);
    toast.success("Logged out Successfully")
    setTimeout(()=>{
      window.location.href = "/";
    }, 1500)
    
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F2F0EF] shadow-sm">
      <div className="relative">
        <div className="flex justify-between items-center px-4 lg:px-10 py-6 mx-auto">
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              ref={buttonRef}
              onClick={toggleMenu}
              className="flex items-center cursor-pointer space-x-4"
              aria-label="Toggle menu"
              aria-controls="main-menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
              <span className="text-sm font-medium uppercase hidden sm:inline">
                Menu
              </span>
            </button>

            <button
              onClick={toggleSearch}
              className="flex items-center cursor-pointer space-x-1    "
              aria-label="Search"
            >
              <Search size={22} />
              <span className="text-sm font-medium hidden sm:inline">
                Search
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="block" aria-label="Home">
              <img src={logo} alt="Logo" className="h-10 sm:h-16 mx-auto" />
            </Link>
          </div>

          {/* Right: User & Wishlist */}
          <div className="flex items-center gap-4 lg:gap-8 md:gap-8 lg:px-2">
            <a href="/cart" className="relative">
              <button aria-label="cart" className="relative">
                <img
                  src={cart}
                  alt="cart"
                  className="h-6 cursor-pointer mx-auto"
                />
                {NumCartItems > 0 && (
                  <span className="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] leading-none font-semibold rounded-full px-1.5 py-1">
                    {NumCartItems}
                  </span>
                )}
              </button>
            </a>
            {/* <Link to="/wishlist"> */}
            <button
              className="flex items-center justify-center w-9 h-9 overflow-visible"
              aria-label="Wishlist"
              onClick={() => navigate("/wishlist")}
            >
              <img
                src={heart}
                alt="Wishlist"
                className="h-5 w-5 md:h-6 md:w-6 cursor-pointer mx-auto"
              />
            </button>
            {/* </Link> */}

            {/* <a href="/profile"><button aria-label="User">
              <img src={profile} alt="profile" className="h-6 cursor-pointer  mx-auto"/>
            </button></a> */}

            <div className="relative">
              <button
                ref={profileButtonRef}
                onClick={toggleProfile}
                aria-label="user"
              >
                <img
                  src={profile}
                  alt="profile"
                  className="h-5 w-5 md:h-6 md:w-6 cursor-pointer mx-auto"
                />
              </button>

              {/* Profile Dropdown */}
              <div
                ref={profileRef}
                className={`bg-[#F2F0EF] absolute right-0 mt-6 w-36 shadow-md transition-all duration-300 ease-in-out z-10  ${
                  profileOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="flex flex-col text-sm font-medium items-center justify-center p-2">
                  <li className="">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-orders"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Order Details
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={Logout}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className={`transition-all duration-300 ease-in-out px-6 bg-[#f5f3f1] ${
            searchOpen ? "max-h-24 py-3" : "max-h-0 py-0 overflow-hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-sm border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        {/* Dropdown Menu */}
        <nav
          ref={menuRef}
          id="main-menu"
          className={`bg-[#F2F0EF] absolute mt-0 left-6 w-28 shadow-md  text-left transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          role="navigation"
        >
          <ul className="flex flex-col text-sm font-medium justify-center items-center text-left">
            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/+919600014187" // Replace with your number
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
