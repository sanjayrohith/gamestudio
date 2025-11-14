import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SNACKS } from '@/lib/mockData';
import { Plus, Edit, Trash2, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

export const ManageSnacks = () => {
  const [snacks] = useState(SNACKS);

  const handleEdit = (snackId: string) => {
    toast.info('Edit functionality - Coming soon');
  };

  const handleDelete = (snackId: string) => {
    toast.success('Snack removed from menu');
  };

  const handleAddNew = () => {
    toast.info('Add new snack - Coming soon');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Snacks Menu</CardTitle>
            <CardDescription>Add, edit, or remove snacks from the menu</CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Snack
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snacks.map((snack) => (
                <TableRow key={snack.id}>
                  <TableCell>
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{snack.name}</TableCell>
                  <TableCell className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {snack.price}
                  </TableCell>
                  <TableCell>{snack.stock || 0}</TableCell>
                  <TableCell>
                    <Badge variant={snack.inStock ? 'default' : 'secondary'}>
                      {snack.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(snack.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(snack.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
