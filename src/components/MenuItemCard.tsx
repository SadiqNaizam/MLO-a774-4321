import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string | number) => void;
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  className,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCartClick = () => {
    onAddToCart(id);
    // Consider using toast notification here, passed from parent or via context
  };

  return (
    <Card className={className ? className : "flex flex-col overflow-hidden"}>
      {imageUrl && (
        <div className="w-full h-32 sm:h-40 overflow-hidden">
            <img
                src={imageUrl || '/placeholder.svg'}
                alt={name}
                className="object-cover w-full h-full"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
        </div>
      )}
      <CardContent className="p-4 flex-grow">
        <h4 className="text-md font-semibold mb-1">{name}</h4>
        {description && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>}
        <p className="text-sm font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-2">
        <Button variant="outline" size="sm" className="w-full" onClick={handleAddToCartClick}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MenuItemCard;