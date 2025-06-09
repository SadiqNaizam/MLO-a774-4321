import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItemCard from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import HeaderNavigation from '@/components/layout/HeaderNavigation';
import { Star, ShoppingCart } from 'lucide-react';
import { toast } from "sonner"; // Assuming sonner is used for toasts

// Placeholder data - in a real app, this would be fetched
const mockRestaurantData: { [key: string]: any } = {
  '1': {
    name: 'The Pizza Place',
    imageUrl: 'https://placehold.co/1200x400/E91E63/FFF?text=Pizza+Place+Banner',
    logoUrl: 'https://placehold.co/100x100/E91E63/FFF?text=PP',
    rating: 4.5,
    deliveryTime: '25-35 min',
    cuisine: 'Italian, Pizza',
    menu: {
      'Appetizers': [
        { id: 'a1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter.', price: 5.99, imageUrl: 'https://placehold.co/300x200/FCE4EC/000?text=Garlic+Bread' },
        { id: 'a2', name: 'Mozzarella Sticks', description: 'Fried mozzarella with marinara.', price: 7.50, imageUrl: 'https://placehold.co/300x200/FCE4EC/000?text=Mozzarella' },
      ],
      'Pizzas': [
        { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://placehold.co/300x200/E91E63/FFF?text=Margherita' },
        { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni.', price: 14.99, imageUrl: 'https://placehold.co/300x200/E91E63/FFF?text=Pepperoni' },
      ],
       'Drinks': [
        { id: 'd1', name: 'Coke', description: 'Classic Coke', price: 2.50, imageUrl: 'https://placehold.co/300x200/757575/FFF?text=Coke' },
        { id: 'd2', name: 'Sprite', description: 'Lemon-Lime Soda', price: 2.50, imageUrl: 'https://placehold.co/300x200/4CAF50/FFF?text=Sprite' },
      ],
    }
  },
  // Add more restaurants if needed for testing other IDs
};


const RestaurantMenuScreen: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0); // Example cart count

  useEffect(() => {
    console.log('RestaurantMenuScreen loaded for restaurant ID:', restaurantId);
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      if (restaurantId && mockRestaurantData[restaurantId]) {
        setRestaurant(mockRestaurantData[restaurantId]);
      } else {
        // Handle restaurant not found, perhaps navigate to a 404 or show message
        console.error("Restaurant not found for ID:", restaurantId);
      }
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [restaurantId]);

  const handleAddToCart = (itemId: string | number) => {
    const item = Object.values(restaurant.menu).flat().find((menuItem: any) => menuItem.id === itemId) as any;
    console.log('Added to cart:', item.name);
    setCartItemCount(prev => prev + 1);
    toast.success(`${item.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderNavigation title="Loading..." showBackButton />
        <div className="p-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeaderNavigation title="Not Found" showBackButton />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Restaurant not found.</p>
        </div>
      </div>
    );
  }

  const menuCategories = Object.keys(restaurant.menu || {});

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation
        title={restaurant.name}
        showBackButton
        actions={
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        }
      />
      
      <div className="relative h-48 md:h-64 w-full">
        <img src={restaurant.imageUrl} alt={restaurant.name} className="object-cover w-full h-full" />
      </div>

      <div className="p-4 -mt-12 relative z-10">
        <div className="bg-card p-4 rounded-lg shadow-lg flex items-start space-x-4">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
            <AvatarFallback>{restaurant.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="default">
                <Star className="w-3 h-3 mr-1 fill-current" /> {restaurant.rating}
              </Badge>
              <Badge variant="secondary">{restaurant.deliveryTime}</Badge>
            </div>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-grow px-4 pb-4">
        <h2 className="text-xl font-semibold my-4">Menu</h2>
        {menuCategories.length > 0 ? (
          <Accordion type="multiple" defaultValue={menuCategories.slice(0,1)} className="w-full">
            {menuCategories.map(category => (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger className="text-lg font-medium">{category}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {(restaurant.menu[category] as any[]).map(item => (
                      <MenuItemCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center py-8">No menu items available for this restaurant.</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default RestaurantMenuScreen;