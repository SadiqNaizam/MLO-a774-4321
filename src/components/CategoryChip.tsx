import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names

interface CategoryChipProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ label, isActive, onClick, className }) => {
  console.log("Rendering CategoryChip:", label, "Active:", isActive);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        isActive
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 focus:ring-primary"
          : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80 focus:ring-ring",
        className
      )}
    >
      {label}
    </button>
  );
}

export default CategoryChip;