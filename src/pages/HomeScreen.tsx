import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryChip from '@/components/CategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Italian', 'Mexican', 'Chinese', 'Desserts'];

const placeholderRestaurants = [
  { id: 1, name: 'The Pizza Place', imageUrl: 'https://placehold.co/600x400/E91E63/FFF?text=Pizza', rating: 4.5, deliveryTime: '25-35 min', cuisine: 'Italian, Pizza' },
  { id:2, name: 'Burger Hub', imageUrl: 'https://placehold.co/600x400/FF9800/FFF?text=Burger', rating: 4.2, deliveryTime: '20-30 min', cuisine: 'American, Burgers' },
  { id: 3, name: 'Sushi World', imageUrl: 'https://placehold.co/600x400/4CAF50/FFF?text=Sushi', rating: 4.8, deliveryTime: '30-40 min', cuisine: 'Japanese, Sushi' },
  { id: 4, name: 'Pasta Express', imageUrl: 'https://placehold.co/600x400/2196F3/FFF?text=Pasta', rating: 4.0, deliveryTime: '20-30 min', cuisine: 'Italian' },
];

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('HomeScreen loaded');
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    console.log('Category selected:', category);
  };

  const handleRestaurantClick = (id: string | number) => {
    console.log('Restaurant clicked:', id);
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'All' || restaurant.cuisine.includes(activeCategory))
  );

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0"> {/* Padding bottom for BottomNavigation */}
      <header className="p-4 sticky top-0 bg-background z-10 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search restaurants or dishes..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <section className="p-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-2">
            {categories.map(category => (
              <CategoryChip
                key={category}
                label={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <main className="flex-grow p-4">
        <h2 className="text-xl font-bold mb-4">Nearby Restaurants</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                imageUrl={restaurant.imageUrl}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                cuisine={restaurant.cuisine}
                onClick={handleRestaurantClick}
              />
            ))}
            {filteredRestaurants.length === 0 && (
              <p className="text-muted-foreground col-span-full text-center">No restaurants found.</p>
            )}
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default HomeScreen;