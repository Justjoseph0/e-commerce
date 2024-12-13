
const AdminOrders = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100">
            <td className="p-3">#12345</td>
            <td className="p-3">John Doe</td>
            <td className="p-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Completed
              </span>
            </td>
            <td className="p-3">$299.99</td>
          </tr>
          {/* More order rows... */}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders