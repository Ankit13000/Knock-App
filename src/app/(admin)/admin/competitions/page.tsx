'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MoreHorizontal, PlusCircle, Trash2, Edit, Copy } from 'lucide-react';
import type { Competition } from '@/lib/types';
import { CompetitionForm } from '@/components/admin/CompetitionForm';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

export default function CompetitionsPage() {
  const { competitions, addCompetition, updateCompetition, deleteCompetition } = useApp();
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const handleCreate = () => {
    setSelectedCompetition(null);
    setIsFormOpen(true);
  };

  const handleEdit = (competition: Competition) => {
    setSelectedCompetition(competition);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCompetition(id);
    toast({ title: "Success", description: "Competition deleted." });
  };
  
  const handleClone = (competition: Competition) => {
    const newCompetition = {
      ...competition,
      id: new Date().toISOString(),
      title: `${competition.title} (Copy)`,
      participants: 0,
      status: 'Upcoming' as const,
    };
    addCompetition(newCompetition);
    toast({ title: "Success", description: `Cloned "${competition.title}".` });
  };


  const handleSave = (competitionData: Competition) => {
    if (selectedCompetition) {
      // Edit
      updateCompetition(competitionData);
      toast({ title: "Success", description: "Competition updated." });
    } else {
      // Create
      addCompetition({ ...competitionData, id: new Date().toISOString() });
      toast({ title: "Success", description: "Competition created." });
    }
    setIsFormOpen(false);
    setSelectedCompetition(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Manage Competitions</h1>
            <p className="text-muted-foreground">Create, edit, and delete competitions.</p>
          </div>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Competition
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Competitions</CardTitle>
            <CardDescription>A list of all competitions in the app.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Game Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Entry Fee</TableHead>
                  <TableHead>Prize</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.title}</TableCell>
                    <TableCell>{comp.gameType}</TableCell>
                    <TableCell>
                      <Badge variant={
                        comp.status === 'Live' ? 'default' :
                        comp.status === 'Upcoming' ? 'secondary' : 'outline'
                      }>
                        {comp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{comp.entryFee}</TableCell>
                    <TableCell>₹{comp.prize}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(comp)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleClone(comp)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Clone</span>
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
                                  This action cannot be undone. This will permanently delete the competition.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(comp.id)}>Continue</AlertDialogAction>
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
      
      <CompetitionForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
        competition={selectedCompetition}
      />
    </>
  );
}
