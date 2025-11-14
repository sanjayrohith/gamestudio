import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SNACKS } from '@/lib/mockData';
import { addOrder, getOrders } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { toast } from 'sonner';
import { ShoppingCart, Plus, Minus, IndianRupee, Trash2 } from 'lucide-react';
import { CartItem } from '@/lib/types';

export const SnacksOrdering = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const user = getCurrentUser();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (snackId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.snackId === snackId);
      if (existing) {
        return prev.map((item) =>
          item.snackId === snackId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { snackId, quantity: 1 }];
    });
    toast.success('Added to cart');
  };

  const updateQuantity = (snackId: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.snackId === snackId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0);
      return updated;
    });
  };

  const removeFromCart = (snackId: string) => {
    setCart((prev) => prev.filter((item) => item.snackId !== snackId));
    toast.success('Removed from cart');
  };

  const cartTotal = cart.reduce((total, item) => {
    const snack = SNACKS.find((s) => s.id === item.snackId);
    return total + (snack?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const order = {
      id: `ORD${Date.now()}`,
      customerId: user?.id || '',
      customerName: user?.name || '',
      items: cart.map((item) => {
        const snack = SNACKS.find((s) => s.id === item.snackId);
        return {
          snackId: item.snackId,
          snackName: snack?.name || '',
          quantity: item.quantity,
          price: snack?.price || 0,
        };
      }),
      totalAmount: cartTotal,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    setCart([]);
    toast.success('Order placed successfully!', {
      description: `Total: ₹${cartTotal}`,
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Snacks Menu</CardTitle>
            <CardDescription>Order your favorite snacks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {SNACKS.map((snack) => (
                <Card key={snack.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-semibold">{snack.name}</h3>
                      <Badge variant={snack.inStock ? 'default' : 'secondary'}>
                        {snack.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <p className="mb-3 flex items-center text-lg font-bold text-primary">
                      <IndianRupee className="h-4 w-4" />
                      {snack.price}
                    </p>
                    <Button
                      onClick={() => addToCart(snack.id)}
                      disabled={!snack.inStock}
                      className="w-full"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart ({cart.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => {
                    const snack = SNACKS.find((s) => s.id === item.snackId);
                    if (!snack) return null;
                    return (
                      <div key={item.snackId} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{snack.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <IndianRupee className="h-3 w-3" />
                            {snack.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.snackId, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.snackId, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => removeFromCart(item.snackId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="flex items-center text-primary">
                      <IndianRupee className="h-5 w-5" />
                      {cartTotal}
                    </span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
