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
import AreaChartDash from "./ui/area-chart";
import BarChartDash from "./ui/bar-chart";
import ExCard from "./ui/ClickCards";
import InAreaChartDash from "./ui/in-area-chart";
import { PieChartDash } from "./ui/pie-chart";
import { Links, Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
interface Card {
  description: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  content: string | (() => React.ReactNode);
}
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
        StockSync
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
  const cards: Card[] = [
    {
      description: "Total number of sales in the current month",
      title: "Sales",
      ctaText: "View",
      ctaLink: "https://your-link-here.com/sales",
      content: () => (
        <p>
          The total number of sales this month is a key indicator of the business's performance.
          It's crucial to monitor this metric to ensure the business is on track to meet its targets.
          <br />
          <br />
          Monitoring sales trends helps in forecasting and planning for future inventory needs,
          ensuring that popular products are always in stock and slow-moving items are identified.
        </p>
      ),
    },
    {
      description: "Current stock levels of all products",
      title: "Inventory",
      ctaText: "View",
      ctaLink: "https://your-link-here.com/inventory",
      content: () => (
        <p>
          Keeping track of current stock levels is essential for inventory management. 
          It helps in maintaining an optimal stock level, reducing the holding cost, and avoiding stockouts or overstock situations.
          <br />
          <br />
          Regularly updating stock information ensures accurate data is available for making informed decisions.
        </p>
      ),
    },
    {
      description: "Number of products that need to be reordered",
      title: "Reorders",
      ctaText: "View",
      ctaLink: "https://your-link-here.com/reorders",
      content: () => (
        <p>
          Identifying products that need to be reordered helps in maintaining continuous availability of products.
          <br />
          <br />
          Timely reordering prevents stockouts and ensures customer satisfaction by meeting demand without delay.
        </p>
      ),
    },
    {
      description: "Products that are low in stock",
      title: "Low Stock",
      ctaText: "View",
      ctaLink: "https://your-link-here.com/low-stock",
      content: () => (
        <p>
          Keeping an eye on low stock products is crucial for preventing stockouts and ensuring that popular items are always available for customers.
          <br />
          <br />
          Proactively managing low stock items helps in planning reorders and maintaining optimal stock levels.
        </p>
      ),
    },
    {
      description: "Total value of current inventory",
      title: "Inventory Value",
      ctaText: "View",
      ctaLink: "https://your-link-here.com/inventory-value",
      content: () => (
        <p>
          The total value of current inventory provides insights into the capital tied up in stock.
          <br />
          <br />
          It helps in assessing the financial health of the business and making informed purchasing decisions.
        </p>
      ),
    },
  ];
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 overflow-x-hidden hide-scrollbar rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black flex flex-col gap-10 flex-1 w-full h-full">
        <div className="flex gap-2">
          <ExCard cards={cards[0]}/>
          <ExCard cards={cards[1]}/>
          <ExCard cards={cards[2]}/>
        </div>
        <div className="flex justify-around">
          <BarChartDash/>
          <PieChartDash/>
          <AreaChartDash/>
        </div>
        <div className="w-full">
          <InAreaChartDash/>
        </div>
      </div>
    </div>
  );
};
