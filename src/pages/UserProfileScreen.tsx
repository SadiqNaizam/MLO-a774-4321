import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderHistoryItem from '@/components/OrderHistoryItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BottomNavigation from '@/components/layout/BottomNavigation';
import { LogOut, Edit3 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const addressSchema = z.object({
  street: z.string().min(3, "Street is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP code is required"),
  isDefault: z.boolean().optional(),
});
type AddressFormValues = z.infer<typeof addressSchema>;


const placeholderOrders = [
  { id: 'order1', restaurantName: 'The Pizza Place', date: '2024-07-20', status: 'Delivered', totalAmount: 25.50, itemsCount: 2, imageUrl: 'https://placehold.co/100x100/E91E63/FFF?text=Pizza' },
  { id: 'order2', restaurantName: 'Burger Hub', date: '2024-07-18', status: 'Cancelled', totalAmount: 15.00, itemsCount: 1, imageUrl: 'https://placehold.co/100x100/FF9800/FFF?text=Burger' },
  { id: 'order3', restaurantName: 'Sushi World', date: '2024-07-22', status: 'Out for Delivery', totalAmount: 35.75, itemsCount: 3, imageUrl: 'https://placehold.co/100x100/4CAF50/FFF?text=Sushi' },
];

const placeholderAddresses = [
    { id: 'addr1', street: '123 Home St', city: 'Yourtown, ST 12345', isDefault: true },
    { id: 'addr2', street: '456 Work Ave', city: 'Businesston, ST 67890', isDefault: false },
];


const UserProfileScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'profile';
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState(placeholderAddresses);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://placehold.co/100x100/2196F3/FFF?text=JD',
    phone: '555-123-4567'
  };

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, email: user.email, phone: user.phone },
  });

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { street: '', city: '', zip: '', isDefault: false },
  });


  useEffect(() => {
    console.log('UserProfileScreen loaded, tab:', activeTab);
    profileForm.reset({ name: user.name, email: user.email, phone: user.phone });
  }, [activeTab, user.name, user.email, user.phone, profileForm]);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile updated:', data);
    // Update user data (mock)
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone || '';
    toast.success("Profile updated successfully!");
    setIsEditingProfile(false);
  };
  
  const onAddressSubmit = (data: AddressFormValues) => {
    console.log('New address:', data);
    const newAddress = { id: `addr${addresses.length + 1}`, ...data, street: `${data.street}, ${data.city}, ${data.zip}` };
    setAddresses(prev => [newAddress, ...prev]);
    toast.success("Address added successfully!");
    addressForm.reset();
    setIsAddingAddress(false);
  };


  const handleOrderClick = (orderId: string | number) => {
    console.log('View order details:', orderId);
    // navigate(`/order/${orderId}`); // Example navigation
    toast.info(`Viewing details for order ${orderId}`);
  };

  const handleLogout = () => {
    console.log('User logged out');
    toast.success("Logged out successfully.");
    navigate('/login'); // Assuming a login route
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0"> {/* Padding for BottomNavigation */}
      <header className="p-4 border-b bg-background sticky top-0 z-30">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">My Profile</h1>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-grow">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 m-2 md:m-4">
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
          {/* <TabsTrigger value="payment">Payment Methods</TabsTrigger> */}
        </TabsList>

        <TabsContent value="profile" className="p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                <Edit3 className="h-4 w-4 mr-2" /> {isEditingProfile ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField control={profileForm.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl><Input type="tel" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="p-0 md:p-4">
          <ScrollArea className="h-[calc(100vh-280px)] md:h-auto"> {/* Adjust height as needed */}
            <div className="space-y-4 p-4 md:p-0">
              {placeholderOrders.length > 0 ? placeholderOrders.map(order => (
                <OrderHistoryItem
                  key={order.id}
                  {...order}
                  onClick={handleOrderClick}
                />
              )) : (
                 <Card className="text-center p-8">
                    <CardTitle className="mb-2">No Orders Yet</CardTitle>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">You haven't placed any orders. Start shopping to see your order history here.</p>
                        <Button onClick={() => navigate('/')}>Browse Restaurants</Button>
                    </CardContent>
                 </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="addresses" className="p-4">
            <Card className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Saved Addresses</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(!isAddingAddress)}>
                         {isAddingAddress ? 'Cancel' : 'Add New Address'}
                    </Button>
                </CardHeader>
                <CardContent>
                    {isAddingAddress && (
                         <Form {...addressForm}>
                            <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4 mb-6 p-4 border rounded-md">
                                <FormField control={addressForm.control} name="street" render={({ field }) => (
                                    <FormItem><FormLabel>Street</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={addressForm.control} name="city" render={({ field }) => (
                                    <FormItem><FormLabel>City, State</FormLabel><FormControl><Input placeholder="Anytown, ST" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={addressForm.control} name="zip" render={({ field }) => (
                                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={addressForm.control} name="isDefault" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Set as default</FormLabel></FormItem>
                                )}/>
                                <Button type="submit">Save Address</Button>
                            </form>
                         </Form>
                    )}
                    {addresses.length > 0 ? (
                        <div className="space-y-3">
                        {addresses.map(addr => (
                            <Card key={addr.id} className="p-3">
                                <p className="font-semibold">{addr.street}</p>
                                {addr.isDefault && <Badge variant="secondary" className="mt-1">Default</Badge>}
                                {/* Add Edit/Delete buttons here */}
                            </Card>
                        ))}
                        </div>
                    ) : (
                        !isAddingAddress && <p className="text-muted-foreground">No saved addresses.</p>
                    )}
                </CardContent>
            </Card>
        </TabsContent>


      </Tabs>
      <BottomNavigation />
    </div>
  );
};

export default UserProfileScreen;