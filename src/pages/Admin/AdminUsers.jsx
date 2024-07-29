import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash, Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { motion } from 'framer-motion'

const AdminUsers = () => {
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [invoices, setInvoices] = useState([
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV005",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV006",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "GPay",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV008",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "GPay",
    },
  ])

  const handleEditClick = (invoice) => {
    setSelectedUser(invoice)
    setEditMode(true)
    setOpen(true)
  }

  const handleDeleteClick = (invoiceId) => {
    setInvoices(invoices.filter(invoice => invoice.invoice !== invoiceId))
  }

  const handleSheetClose = () => {
    setOpen(false)
    setEditMode(false)
    setSelectedUser(null)
  }

  return (
    <>
      <Card className='mx-5 mt-8'>
        <CardHeader className='w-full flex flex-row justify-between items-center'>
          <CardTitle>Users</CardTitle>
          <Button onClick={() => setOpen(true)}>
            <Plus className='h-4 w-4 mr-2' /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice} className="hover:bg-red-100 transition-colors duration-200">
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  <TableCell className="text-right flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(invoice)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="ml-2" onClick={() => handleDeleteClick(invoice.invoice)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={handleSheetClose}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{editMode ? 'Edit User' : 'Add User'}</SheetTitle>
              <SheetDescription>
                {editMode ? 'Make changes to the user details here.' : 'Fill in the details to add a new user.'}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={editMode ? selectedUser.name : ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue={editMode ? selectedUser.username : ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" defaultValue={editMode ? selectedUser.email : ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" className="col-span-3" />
              </div>
            </div>
            <SheetFooter className="flex flex-col flex-1 space-y-2">
              <Button variant="outline" className="w-full h-full" onClick={handleSheetClose}>Cancel</Button>
              <Button type="submit" className="w-full h-full">{editMode ? 'Save changes' : 'Add User'}</Button>
            </SheetFooter>
          </SheetContent>
        </motion.div>
      </Sheet>
    </>
  )
}

export default AdminUsers
