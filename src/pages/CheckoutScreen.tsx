import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Assuming shadcn form setup
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeaderNavigation from '@/components/layout/HeaderNavigation';
import { useForm } from "react-hook-form"; // For basic form structure
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

// Basic Zod schema for demonstration
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required").max(10),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["creditCard", "paypal", "cod"], { required_error: "Please select a payment method." }),
  saveAddress: z.boolean().optional(),
  specialInstructions: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      paymentMethod: undefined,
      saveAddress: false,
      specialInstructions: "",
    },
  });

  useEffect(() => {
    console.log('CheckoutScreen loaded');
  }, []);

  const onSubmit = (data: CheckoutFormValues) => {
    setIsLoading(true);
    console.log('Checkout form submitted:', data);
    // Simulate API call for placing order
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Order placed successfully!");
      // Potentially clear cart here or redirect to an order confirmation page
      navigate('/profile?tab=orders'); // Redirect to order history in profile
    }, 2000);
  };

  // Dummy order summary data
  const orderSummary = {
    subtotal: 18.98,
    delivery: 5.00,
    taxes: 1.90,
    total: 25.88,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation title="Checkout" showBackButton />
      <main className="flex-grow p-4 container mx-auto max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl><Input placeholder="12345" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="md:col-span-1">
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                    control={form.control}
                    name="saveAddress"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>Save this address for future orders</FormLabel>
                        </div>
                        </FormItem>
                    )}
                 />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                            <FormLabel className="font-normal">Credit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="paypal" /></FormControl>
                            <FormLabel className="font-normal">PayPal</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="cod" /></FormControl>
                            <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader><CardTitle>Special Instructions</CardTitle></CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="specialInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any special requests for your order?</FormLabel>
                      <FormControl><Input placeholder="e.g., No onions, extra sauce" {...field} /></FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between"><span>Subtotal:</span><span>${orderSummary.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery:</span><span>${orderSummary.delivery.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes:</span><span>${orderSummary.taxes.toFixed(2)}</span></div>
                <hr/>
                <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${orderSummary.total.toFixed(2)}</span></div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Placing Order...' : `Place Order - $${orderSummary.total.toFixed(2)}`}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CheckoutScreen;