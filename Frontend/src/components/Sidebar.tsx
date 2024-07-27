"use client";
import { useUser } from "@/global/useUser";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconMoon,
  IconSettings,
  IconSun,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Links, Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";

// Define the structure of each link
// interface LinkItem {
//   label: string;
//   href?: string; // Optional href for button-like actions
//   icon: React.JSX.Element | React.ReactNode;
//   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Only for button actions
//   type: 'button' | 'link'; // To distinguish between button and link actions
// }

export default function SidebarDemo() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default action
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const links: Links[] = [
    {
      label: theme === "light" ? "Dark Mode" : "Light Mode",
      icon: theme === "light" ? <IconMoon className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> : <IconSun className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
      onClick: toggleTheme,
      type: 'button',
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      type: 'link',
    },
    {
      label: "Logout",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: (e:any) => {
        e.preventDefault(); // Prevent default link behavior
        logout();
        navigate("/auth/login");
      },
      type: 'button',
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const getAvatar = () => {
    if (user.picture === "none") {
      return (
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gray-500 text-white flex items-center justify-center">
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <img
          src={user.picture}
          className="h-7 w-7 flex-shrink-0 rounded-full"
          width={50}
          height={50}
          alt="Avatar"
        />
      );
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user.name,
                href: "#", // Ensure href is defined
                icon: getAvatar(),
                type: 'link', // Since this is a profile link, treat it as a link
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo: React.FC = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
}

export const LogoIcon: React.FC = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
}

// Dummy dashboard component with content
const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={`first-array-${i}`}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={`second-array-${i}`}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
