import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Close dropdown when opening mobile menu
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setMenuOpen(false); // Close mobile menu when opening dropdown
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setMenuOpen(false); // Close menus after logout
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/70 dark:border-gray-700 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo/Title */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              ሥራ ቀምር
            </h1>
          </Link>

          {/* Right-aligned items: User menu, Dark Mode Toggle, Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
                  aria-label="User menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.761 0-5 2.239-5 5h10c0-2.761-2.239-5-5-5z"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 animate-fade-in-down">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      ውጣ
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <label className="relative inline-block w-[4em] h-[2.2em] rounded-full shadow-inner bg-gray-300 dark:bg-gray-700 transition-colors duration-300">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="w-0 h-0 opacity-0 peer" // Hide checkbox but keep it for functionality
              />
              <span
                className="absolute cursor-pointer inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-400
                before:content-[''] before:absolute before:h-[1.8em] before:w-[1.8em] before:rounded-full before:left-[0.2em] before:bottom-[0.2em]
                before:bg-white before:transition-transform before:duration-400 before:ease-in-out
                peer-checked:before:translate-x-[1.8em] peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-500"
              />
              {/* Sun icon */}
              <svg
                className="absolute left-[0.4em] top-[0.4em] w-4 h-4 text-yellow-500 transition-all duration-300 peer-checked:opacity-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.427 4.636a.75.75 0 01.066 1.06L6.11 7.743a.75.75 0 01-1.06-1.06l1.38-1.38a.75.75 0 011.06-.067zm10.516 0a.75.75 0 01.067 1.06l-1.38 1.38a.75.75 0 01-1.06-1.06l1.38-1.38a.75.75 0 011.06-.067zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM18.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM4.5 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zm13.864 5.364a.75.75 0 01-1.06.066l-1.38 1.38a.75.75 0 111.06 1.06l1.38-1.38a.75.75 0 01-.066-1.06zm-10.516 0a.75.75 0 01-1.06-.067l-1.38 1.38a.75.75 0 111.06 1.06l1.38-1.38a.75.75 0 01.067-1.06zM12 21.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0v2.25a.75.75 0 01-.75.75z" />
              </svg>

              {/* Moon icon */}
              <svg
                className="absolute right-[0.4em] top-[0.4em] w-4 h-4 text-white transition-all duration-300 opacity-0 peer-checked:opacity-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.53 2.659a.75.75 0 01.442 1.258 8.611 8.611 0 00-4.706 5.606.75.75 0 01-1.164.717 10.155 10.155 0 015.776-6.666zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2.25 12c0 5.66 4.06 10.372 9.406 11.232a.75.75 0 01-.976-1.062 8.61 8.61 0 00-4.706-5.606.75.75 0 011.164-.717 10.155 10.155 0 015.776 6.666.75.75 0 01.442 1.258A.75.75 0 0112 21.75c5.66 0 10.372-4.06 11.232-9.406a.75.75 0 01-1.062-.976A8.61 8.61 0 0018.75 4.25a.75.75 0 01-.717-1.164 10.155 10.155 0 01-6.666-5.776.75.75 0 011.258.442z" />
              </svg>
            </label>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-200"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? 'block' : 'hidden'
            } mt-4 md:mt-0`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0 md:bg-transparent dark:bg-gray-800/50 dark:border-gray-700 md:dark:bg-transparent shadow-xl md:shadow-none">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  መነሻ
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/tasks"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    ተግባራት
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      መግባት
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      መመዝገብ
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;