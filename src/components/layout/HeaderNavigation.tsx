import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react'; // Back icon
import { cn } from '@/lib/utils';

interface HeaderNavigationProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void; // Custom back click handler
  actions?: React.ReactNode; // e.g., buttons or icons on the right
  className?: string;
  sticky?: boolean;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  title,
  showBackButton,
  onBackClick,
  actions,
  className,
  sticky = true,
}) => {
  const navigate = useNavigate();
  console.log("Rendering HeaderNavigation, title:", title);

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // Default browser back action
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-4 bg-background border-b border-border",
        sticky && "sticky top-0 z-40",
        className
      )}
    >
      <div className="flex items-center">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2 mr-2">
            <ChevronLeft className="w-6 h-6" />
            <span className="sr-only">Back</span>
          </Button>
        )}
        {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
      </div>
      <div className="flex items-center space-x-2">
        {actions}
      </div>
    </header>
  );
}

export default HeaderNavigation;