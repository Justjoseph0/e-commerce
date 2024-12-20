import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Calendar, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerListPage = () => {
  const { getAllUsers } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function getUsers() {
      const data = await getAllUsers(searchTerm, statusFilter);
      setCustomers(data.results);
      console.log(data);
    }
  
    getUsers();
    <h1>hello w</h1>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  return (
    <div>
      <Card className="w-full shadow-sm border-none">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <CardTitle className="text-2xl font-bold">Customer List</CardTitle>

            <div className="flex w-full md:w-auto flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />

              <div className="flex items-center space-x-2">
                <Filter className="text-gray-500" size={20} />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border hidden md:table-cell">
                    ID
                  </th>
                  <th className="p-3 text-left border">Name</th>
                  <th className="p-3 text-left border hidden md:table-cell">
                    Email
                  </th>
                  <th className="p-3 text-left border hidden lg:table-cell">
                    Phone
                  </th>
                  <th className="p-3 text-left border hidden lg:table-cell">
                    Date Joined
                  </th>
                  <th className="p-3 text-left border hidden lg:table-cell">
                    Total Purchases
                  </th>
                  <th className="p-3 text-left border">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 border hidden md:table-cell">
                      {customer.id}
                    </td>
                    <td className="p-3 border">
                      <div className="font-semibold capitalize">
                        {customer.last_name} {customer.first_name}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden flex items-center space-x-1">
                        <Calendar size={12} className="text-gray-400" />
                        <span>{new Date(customer.date_joined).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-gray-500 md:hidden flex items-center space-x-1">
                        <ShoppingCart size={12} className="text-gray-400" />
                        <span>₦{customer.total_purchase.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500 md:hidden">
                        {customer.email}
                      </div>
                      <div className="text-xs text-gray-500 lg:hidden">
                        {"customer.phone"}
                      </div>
                    </td>
                    <td className="p-3 border hidden md:table-cell">
                      {customer.email}
                    </td>
                    <td className="p-3 border hidden lg:table-cell">
                      {"customer.phone"}
                    </td>
                    <td className="p-3 border hidden lg:table-cell">
                      {new Date(customer.date_joined).toLocaleDateString()}
                    </td>
                    <td className="p-3 border hidden lg:table-cell">
                      ₦{customer.total_purchase.toFixed(2)}
                    </td>
                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          customer.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {customers.length === 0 && (
              <div className="text-center text-gray-500 p-4">
                No customers found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerListPage;  