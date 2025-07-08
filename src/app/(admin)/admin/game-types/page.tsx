'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreHorizontal, PlusCircle, Trash2, Edit } from 'lucide-react';
import type { GameType } from '@/lib/types';
import { GameTypeForm } from '@/components/admin/GameTypeForm';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

export default function GameTypesPage() {
  const { gameTypes, addGameType, updateGameType, deleteGameType } = useApp();
  const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleCreate = () => {
    setSelectedGameType(null);
    setIsFormOpen(true);
  };

  const handleEdit = (gameType: GameType) => {
    setSelectedGameType(gameType);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteGameType(id);
    toast({ title: "Success", description: "Game type deleted." });
  };

  const handleSave = (gameTypeData: GameType) => {
    if (selectedGameType) {
      updateGameType(gameTypeData);
      toast({ title: "Success", description: "Game type updated." });
    } else {
      addGameType({ ...gameTypeData, id: new Date().toISOString() });
      toast({ title: "Success", description: "Game type created." });
    }
    setIsFormOpen(false);
    setSelectedGameType(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Manage Game Types</h1>
            <p className="text-muted-foreground">Add, edit, and remove game types.</p>
          </div>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Game Type
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Game Types</CardTitle>
            <CardDescription>A list of all available game types for competitions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameTypes.map((gt) => (
                  <TableRow key={gt.id}>
                    <TableCell className="font-medium">{gt.name}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(gt)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                                <span className="text-destructive">Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the game type.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(gt.id)}>Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <GameTypeForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
        gameType={selectedGameType}
      />
    </>
  );
}
