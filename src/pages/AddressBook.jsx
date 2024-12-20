import { useEffect, useState } from "react";
import { PlusCircle, Home, Building2, Trash2, PenSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const AddressBook = () => {
  const { getUserAddress, deleteAddress } = useAuth();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  async function fetchAddresses() {
    const data = await getUserAddress();
    setAddresses(data);
  }

  async function handleDelete(id) {
    await deleteAddress(id);
    fetchAddresses();
    setDeleteDialogOpen(false);
    setSelectedAddressId(null);
  }

  useEffect(() => {
    fetchAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = () => {
    navigate('/profile/add/address');
  };

  const openDeleteDialog = (addressId) => {
    setSelectedAddressId(addressId);
    setDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-custom-brown">Address Book</h1>
        <Button 
          onClick={handleNavigate}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {address.type === "home" ? (
                    <Home className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Building2 className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <div className="font-medium capitalize">
                      {address.first_name} {address.last_name}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {address?.address_type} Address
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate(`/profile/edit/address/${address.id}`)}
                  >
                    <PenSquare className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteDialog(address.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">{address.street_address}</p>
                <p className="text-gray-700">
                  {address.city}, {address.state}, {address.postal_code}
                </p>
              </div>

              {address.is_default && (
                <div className="mt-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Default Address
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this address
              from your address book.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedAddressId)}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressBook;