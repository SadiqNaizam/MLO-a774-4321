import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, ShoppingCart, User, ListOrdered } from 'lucide-react'; // Example icons

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const defaultNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/orders', label: 'Orders', icon: ListOrdered },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/profile', label: 'Profile', icon: User },
];

interface BottomNavigationProps {
  navItems?: NavItem[];
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ navItems = defaultNavItems }) => {
  const location = useLocation();
  console.log("Rendering BottomNavigation, current path:", location.pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border shadow-up z-50 md:hidden">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors",
                isActive && "text-primary"
              )}
            >
              <item.icon className={cn("w-6 h-6 mb-0.5", isActive ? "fill-current" : "")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;