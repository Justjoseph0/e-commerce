import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/Loading";

const EditAddress = () => {
  const {  getUserAddress, updateAddress } = useAuth();
  const navigate = useNavigate();
  const { addressId } = useParams(); 
  const [loading, setLoading] = useState(true);

  const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", 
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {

    const fetchAddress = async () => {
      setLoading(true);
      try {
        const data = await getUserAddress(addressId);

        console.log(data);
        
        if (data) {
          setFormData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            phone: data.phone_number || "",
            addressLine1: data.street_address || "",
            city: data.city || "",
            state: data.state || "",
            zipCode: data.postal_code || "",
            country: data.country || "",
            isDefault: data.is_default || false,
          });
        }
      } catch (error) {
        console.error("Failed to fetch address:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchAddress();
  }, [addressId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      street_address: formData.addressLine1,
      city: formData.city,
      state: formData.state,
      postal_code: formData.zipCode,
      country: formData.country,
      is_default: formData.isDefault,
    };

    // Handle address update
    await updateAddress(addressId, data);
    navigate("/profile/address");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isDefault: checked,
    }));
  };
if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="first name"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="last name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="phone number"
                />
              </div>

              <div>
                <Label htmlFor="addressLine1">Street Address</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Street address, P.O. box"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    name="state"
                    value={formData.state}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "state", value } })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345 (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    name="country"
                    value={formData.country}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "country", value } })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="isDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as default address
                </Label>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" type="button" onClick={() => navigate("/profile/address")}>
                Cancel
              </Button>
              <Button type="submit">Save Address</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAddress;
