import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { getUserAddress } = useAuth();
  const [addresses, setAddresses] = useState([]);



  const {
    email,
    city,
    state,
    last_name: lastName,
    first_name: firstName,
    street_address:street,
    phone_number: phone,
  } = addresses;
    


  async function userAddress() {
    const data = await getUserAddress();

    const defaultAddress = data.find((address) => address.is_default === true);
    setAddresses(defaultAddress);
  }
  useEffect(() => {
    userAddress();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6 text-custom-brown">
        Account Details
      </h1>

      <div className="flex gap-2">
        <Card className="w-full h-fit rounded-sm shadow-sm border-gray-300">
          <CardHeader className="border-b p-4 border-gray-300">
            <CardTitle>
              <div className="flex items-center">
                <User className="mr-3 text-blue-700" />
                Personal Information
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="font-medium capitalize">
                  {firstName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium ">{lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full h-fit rounded-sm shadow-sm border-gray-300">
          <CardHeader className="border-b p-4 border-gray-300">
            <CardTitle>
              <div className="flex items-center justify-between">
                <span> Address Book</span>
                <Link to="/profile/address">
                  <Edit size={20} className="mr-2 text-blue-700" />
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-y-2 text-custom-brown">
              <p className="font-medium">Your default shipping address:</p>
              <div>
                <p className="text-sm capitalize">
                  {firstName} {lastName}
                </p>
                <p className="text-sm capitalize">
                  {street}
                </p>
                <p className="text-sm capitalize">{city}, {state}</p>
                <p className="text-sm capitalize">+234 {phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
