

const AdminDashboard = () => {
 
  return (
    <div>
    <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Total Revenue</p>
        <p className="text-2xl font-bold text-blue-600">$45,231</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Orders</p>
        <p className="text-2xl font-bold text-green-600">352</p>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Customers</p>
        <p className="text-2xl font-bold text-purple-600">1,234</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Refunds</p>
        <p className="text-2xl font-bold text-red-600">12</p>
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;