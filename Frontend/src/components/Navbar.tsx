import { cn } from "@/lib/utils";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "./ui/navbar-menu";

// Helper function to get the theme from localStorage
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light"; // default to "light" if not set
  }
  return "light";
};

// Helper function to apply the theme class to the body
const applyTheme = (theme: string) => {
  document.body.classList.toggle("dark", theme === "dark");
};

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-5" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>(getInitialTheme);

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <button
          type="button"
          onClick={toggleTheme}
          className={cn("icon-btn", {
            "icon-light": theme === "light",
            "icon-dark": theme === "dark",
          })}
        >
          {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
        <Link to="/auth/login">
          <MenuItem setActive={setActive} active={active} item="Login" />
        </Link>
      </Menu>
    </div>
  );
}
