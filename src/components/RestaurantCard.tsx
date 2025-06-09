import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react'; // Example icons

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number | string;
  deliveryTime: string; // e.g., "20-30 min"
  cuisine: string;
  onClick: (id: string | number) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  cuisine,
  onClick,
  className,
}) => {
  console.log("Rendering RestaurantCard:", name);

  const handleCardClick = () => {
    onClick(id);
  };

  return (
    <Card
      className={className ? className : "w-full overflow-hidden cursor-pointer transition-shadow hover:shadow-md"}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">{cuisine}</Badge>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;