import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get user initials for avatar
  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    setTimeout(() => navigate('/'), 100);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About Us", path: "/about" },
  ];

  const logoUrl =
    "https://media.licdn.com/dms/image/v2/D4D0BAQECIHpRqJIBDg/company-logo_200_200/company-logo_200_200/0/1713886646182?e=2147483647&v=beta&t=Qya9if2QIEz6LjOohZfBxX-gZb769ugLKh-cdTz845M";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0f172a]/95 backdrop-blur-md shadow-lg' 
        : 'bg-[#0f172a] shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                HF
              </div>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200">
              Hall of Fame
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                  location.pathname === item.path 
                    ? "text-white bg-blue-600/20 border border-blue-500/30" 
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* User Menu */}
            {user && user.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-auto px-3 rounded-full bg-gray-700/50 text-white hover:bg-gray-600/70 border border-gray-600/50 transition-all duration-200 group"
                    aria-label="User menu"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {getUserInitials(user.email)}
                      </div>
                      <span className="text-sm font-medium hidden lg:block">
                        {user.email.split('@')[0]}
                      </span>
                      <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-gray-800/95 backdrop-blur-md border-gray-700 text-white animate-in slide-in-from-top-2 duration-200"
                  align="end"
                >
                  <div className="flex items-center gap-3 p-3 border-b border-gray-700">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                      {getUserInitials(user.email)}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">{user.email.split('@')[0]}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                      {isAdmin && (
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3 text-blue-400" />
                          <span className="text-xs text-blue-400">Administrator</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-700 hover:bg-gray-700 transition-colors duration-150">
                    <Link to="/profile" className="flex items-center py-2">
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-700 hover:bg-gray-700 transition-colors duration-150">
                      <Link to="/admin" className="flex items-center py-2">
                        <Shield className="mr-3 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer focus:bg-red-600/20 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors duration-150"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0 px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600/20 text-white border border-blue-500/30"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            {user && user.email ? (
              <div className="pt-4 mt-4 border-t border-gray-700 space-y-2">
                <div className="px-3 py-2 flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {getUserInitials(user.email)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{user.email.split('@')[0]}</span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === "/profile"
                      ? "bg-blue-600/20 text-white border border-blue-500/30"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === "/admin"
                        ? "bg-blue-600/20 text-white border border-blue-500/30"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-red-400 hover:bg-red-600/20 hover:text-red-300 rounded-lg transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-4 border-t border-gray-700">
                <Link
                  to="/auth"
                  className={`block px-3 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === "/auth"
                      ? "bg-blue-600/20 text-white border border-blue-500/30"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;