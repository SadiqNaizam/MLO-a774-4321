import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface OrderHistoryItemProps {
  id: string | number;
  restaurantName: string;
  date: string; // Formatted date string
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  itemsCount: number;
  imageUrl?: string; // Optional: restaurant image or primary item image
  onClick: (id: string | number) => void;
  className?: string;
}

const statusColors: Record<OrderHistoryItemProps['status'], string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Processing: 'bg-blue-100 text-blue-800 border-blue-300',
    'Out for Delivery': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    Delivered: 'bg-green-100 text-green-800 border-green-300',
    Cancelled: 'bg-red-100 text-red-800 border-red-300',
};


const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  id,
  restaurantName,
  date,
  status,
  totalAmount,
  itemsCount,
  imageUrl,
  onClick,
  className,
}) => {
  console.log("Rendering OrderHistoryItem:", id);

  const handleItemClick = () => {
    onClick(id);
  };

  return (
    <Card
      className={cn("overflow-hidden cursor-pointer transition-shadow hover:shadow-md", className)}
      onClick={handleItemClick}
    >
      <div className="flex items-start p-4">
        {imageUrl && (
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={restaurantName}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mr-4"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-md sm:text-lg font-semibold truncate">{restaurantName}</h3>
            <Badge variant="outline" className={cn("text-xs", statusColors[status])}>{status}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-1">{date}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {itemsCount} item{itemsCount > 1 ? 's' : ''} &bull; Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
      {/* Optionally, CardFooter for reorder or view details button */}
    </Card>
  );
}

export default OrderHistoryItem;