import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Edit } from "lucide-react";
import { Link } from "react-router-dom";


const ProfilePage = () => {
 
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "joseph",
    lastName: "onuoha",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 123-4567",
  });

 

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
                  {personalInfo.firstName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium ">{personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="font-medium capitalize">{personalInfo.email}</p>
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
                  {personalInfo.firstName} {personalInfo.lastName}
                </p>
                <p className="text-sm capitalize">
                  Comm ave feru Ijaba feru Ijaba ota
                </p>
                <p className="text-sm capitalize">OTTA TOWN (BELLS), Ogun</p>
                <p className="text-sm capitalize">{personalInfo.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
