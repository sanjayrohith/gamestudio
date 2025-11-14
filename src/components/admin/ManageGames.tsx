import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { getGames, addGame, updateGame, deleteGame } from '@/lib/mockData';
import { Game } from '@/lib/types';
import { Plus, Edit, Trash2, IndianRupee, Save } from 'lucide-react';
import { toast } from 'sonner';

export const ManageGames = () => {
  const [games, setGames] = useState(getGames());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });
  const tableHeaders = [
    { label: 'Image' },
    { label: 'Name' },
    { label: 'Price/Hour' },
    { label: 'Description' },
    { label: 'Status' },
    { label: 'Actions', className: 'text-right' },
  ];

  const handleAddGame = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newGame: Game = {
      id: `game${Date.now()}`,
      name: formData.name,
      price: Number(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
      available: true,
      description: formData.description,
    };

    addGame(newGame);
    setGames(getGames());
    setIsAddDialogOpen(false);
    setFormData({ name: '', price: '', image: '', description: '' });
    toast.success('Game added successfully');
  };

  const handleUpdateGame = () => {
    if (!editingGame || !formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    updateGame(editingGame.id, {
      name: formData.name,
      price: Number(formData.price),
      image: formData.image || editingGame.image,
      description: formData.description,
    });

    setGames(getGames());
    setEditingGame(null);
    setFormData({ name: '', price: '', image: '', description: '' });
    toast.success('Game updated successfully');
  };

  const handleDeleteGame = (gameId: string) => {
    deleteGame(gameId);
    setGames(getGames());
    toast.success('Game removed successfully');
  };

  const openEditDialog = (game: Game) => {
    setEditingGame(game);
    setFormData({
      name: game.name,
      price: game.price.toString(),
      image: game.image,
      description: game.description || '',
    });
  };

  const toggleAvailability = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      updateGame(gameId, { available: !game.available });
      setGames(getGames());
      toast.success(`Game ${game.available ? 'disabled' : 'enabled'}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Manage Games Library</CardTitle>
            <CardDescription>Add new games or update existing game prices</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Game
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Game</DialogTitle>
                <DialogDescription>Enter the details for the new game</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Game Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter game name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Hour (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGame}>Add Game</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {tableHeaders.map(({ label, className }) => (
                  <TableHead
                    key={label}
                    className={`text-primary font-semibold tracking-wide ${className ?? ''}`.trim()}
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>
                    <img
                      src={game.image}
                      alt={game.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{game.name}</TableCell>
                  <TableCell className="flex items-center">
                    <IndianRupee className="h-3 w-3" />
                    {game.price}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{game.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={game.available ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleAvailability(game.id)}
                    >
                      {game.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(game)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Game</DialogTitle>
                            <DialogDescription>Update game details and pricing</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Game Name *</Label>
                              <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter game name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-price">Price per Hour (₹) *</Label>
                              <Input
                                id="edit-price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="Enter price"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-image">Image URL</Label>
                              <Input
                                id="edit-image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="Enter image URL"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Input
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter description"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingGame(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateGame}>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteGame(game.id)}
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
