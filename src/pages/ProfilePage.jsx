import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Edit, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

const ProfilePage = () => {
  const { getUserAddress, userProfile } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUserProfile() {
    try {
      const data = await userProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }finally {
      setLoading(false);
    }
  }


  

  async function userAddress() {
    try {
      const data = await getUserAddress();
      const defaultAddress = data.find((address) => address.is_default === true);
      setAddresses(defaultAddress || null);
    } catch (error) {
      console.error("Error fetching address:", error);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    userAddress();
    getUserProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6 text-custom-brown">
        Account Details
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="h-full rounded-sm shadow-sm border-gray-300">
          <CardHeader className="border-b p-4 border-gray-300">
            <CardTitle>
              <div className="flex items-center">
                <User className="mr-3 text-blue-700" />
                Personal Information
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[calc(100%-73px)] flex flex-col">
            {profile ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">First Name</p>
                  <p className="font-medium capitalize">{profile.first_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Name</p>
                  <p className="font-medium capitalize">{profile.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <UserCircle className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  No profile information
                </h2>
                <p className="text-gray-500">
                  Your profile information will appear here once added
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-full rounded-sm shadow-sm border-gray-300">
          <CardHeader className="border-b p-4 border-gray-300">
            <CardTitle>
              <div className="flex items-center justify-between">
                <span>Address Book</span>
                <Link to="/profile/address">
                  <Edit size={20} className="mr-2 text-blue-700" />
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[calc(100%-73px)] flex flex-col">
            {addresses ? (
              <div className="flex flex-col gap-y-2 text-custom-brown">
                <p className="font-medium">Your default shipping address:</p>
                <div>
                  <p className="text-sm capitalize">
                    {addresses.first_name} {addresses.last_name}
                  </p>
                  <p className="text-sm capitalize">{addresses.street_address}</p>
                  <p className="text-sm capitalize">
                    {addresses.city}, {addresses.state}
                  </p>
                  <p className="text-sm capitalize">
                    {addresses.phone_number && `+234 ${addresses.phone_number}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <p className="text-gray-500 mb-4">
                  Add your default shipping address to make checkout easier
                </p>
                <Link to="/profile/add/address">
                  <Button size="sm">Add Address</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>



  );
};

export default ProfilePage;