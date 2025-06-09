import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import HeaderNavigation from '@/components/layout/HeaderNavigation';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://placehold.co/100x100/E91E63/FFF?text=Pizza' },
  { id: 'a1', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: 'https://placehold.co/100x100/FCE4EC/000?text=Garlic' },
];

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartScreen loaded');
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.error("Item removed from cart.");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example delivery fee
  const taxes = subtotal * 0.1; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Add some items to proceed.");
      return;
    }
    console.log('Proceeding to checkout with items:', cartItems);
    navigate('/checkout');
  };
  
  const handlePromoCodeApply = () => {
    if (promoCode === "SAVE10") {
        toast.success("Promo code SAVE10 applied!");
        // Add logic to adjust total if promo code is valid
    } else if (promoCode) {
        toast.error("Invalid promo code.");
    } else {
        toast.info("Please enter a promo code.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0"> {/* Padding for BottomNavigation */}
      <HeaderNavigation title="My Cart" showBackButton />
      
      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <ShoppingCart className="w-24 h-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/')}>Start Shopping</Button>
        </div>
      ) : (
        <ScrollArea className="flex-grow p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden md:table-cell">
                        <img src={item.imageUrl || 'https://placehold.co/100x100/CCCCCC/000?text=Item'} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)}><Minus className="h-4 w-4" /></Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
                <CardTitle>Promo Code</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-2">
                 <InputOTP maxLength={6} value={promoCode} onChange={(value) => setPromoCode(value.toUpperCase())}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <Button onClick={handlePromoCodeApply} disabled={!promoCode}>Apply</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxes (10%)</span><span>${taxes.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={handleProceedToCheckout}>
                Proceed to Checkout (${total.toFixed(2)})
              </Button>
            </CardFooter>
          </Card>
        </ScrollArea>
      )}
      <BottomNavigation />
    </div>
  );
};

export default CartScreen;