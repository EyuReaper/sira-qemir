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
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      setMenuOpen(false);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 dark:bg-gray-900/30 dark:backdrop-blur-md dark:border-gray-500/20 dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="w-full py-4 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          ሥራ ቀምር
        </h1>
      </div>
      <nav className="max-w-screen-xl px-4 mx-auto place-items-center dark:bg-gray-900/30 dark:backdrop-blur-md dark:border-gray-500/20 dark:rounded-lg">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex space-x-3 md:order-2">
            {user && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 glow-on-hover"
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
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800/30 dark:backdrop-blur-md dark:border dark:border-gray-500/20 animate-slide-in">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-red-400 md:dark:hover:text-red-500"
                    >
                      ውጣ
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
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
            <label className="relative inline-block w-[4em] h-[2.2em] text-[17px] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="w-0 h-0 opacity-0"
              />
              <span
                className="absolute cursor-pointer inset-0 bg-[#2a2a2a] dark:bg-[#00a6ff] rounded-full transition duration-400 overflow-hidden
                  before:content-[''] before:absolute before:h-[1.2em] before:w-[1.2em] before:rounded-[20px] before:left-[0.5em] before:bottom-[0.5em]
                  before:transition-[0.4s] before:duration-400 before:[transition-timing-function:cubic-bezier(0.81,-0.04,0.38,1.5)]
                  before:shadow-[inset_8px_-4px_0_0_#fff] dark:before:shadow-[inset_15px_-4px_0_15px_#ffcf48] dark:before:translate-x-[1.8em]"
              >
                <span className="star bg-white rounded-full absolute w-[5px] h-[5px] transition-all duration-400 left-[2.5em] top-[0.5em] dark:opacity-0" />
                <span className="star bg-white rounded-full absolute w-[5px] h-[5px] transition-all duration-400 left-[2.2em] top-[1.2em] dark:opacity-0" />
                <span className="star bg-white rounded-full absolute w-[5px] h-[5px] transition-all duration-400 left-[3em] top-[0.9em] dark:opacity-0" />
                <span className="cloud w-[3.5em] absolute bottom-[-1.4em] left-[-1.1em] opacity-0 transition-all duration-400 dark:opacity-100">
                  <svg viewBox="0 0 64 64" fill="#fff">
                    <path d="M41.4 25.3c-1.2-.4-2.5-.6-3.8-.6-5.8 0-10.6 4.8-10.6 10.6 0 1.2.2 2.4.6 3.5-6.7 0-12.1-5.4-12.1-12.1S20.9 14.6 27.6 14.6c2.6 0 5 .8 7 2.1 1.4-2.3 3.8-3.8 6.5-3.8 4.1 0 7.5 3.4 7.5 7.5 0 2.4-1.1 4.5-2.9 5.9.1-.5.2-1 .2-1.6 0-3.7-2.9-6.7-6.5-6.7z"/>
                  </svg>
                </span>
              </span>
            </label>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              menuOpen ? 'block' : 'hidden'
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800/30 dark:backdrop-blur-md dark:border-gray-500/20 md:dark:bg-gray-900/30">
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => setMenuOpen(false)}
                >
                  መነሻ
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/tasks"
                    className="block px-3 py-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
                      className="block px-3 py-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={() => setMenuOpen(false)}
                    >
                      መግባት
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={() => setMenuOpen(false)}
                    >
                      መመዝገብ
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;