
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';



const AdminDashboard = () => {
  // Sample monthly sales data
  const monthlySalesData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 139 },
    { month: 'Mar', revenue: 5000, orders: 980 },
    { month: 'Apr', revenue: 4780, orders: 390 },
    { month: 'May', revenue: 3890, orders: 480 },
    { month: 'Jun', revenue: 4390, orders: 380 },
  ];

  const metrics = [
    {
      label: "Total Revenue",
      value: "$45,231",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      monthlyChange: 12.5,
      trend: "up"
    },
    {
      label: "Orders",
      value: "352",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      monthlyChange: 8.2,
      trend: "up"
    },
    {
      label: "Customers",
      value: "1,234",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      monthlyChange: 3.4,
      trend: "down"
    },
    {
      label: "Refunds",
      value: "12",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      monthlyChange: 1.1,
      trend: "down"
    }
  ];

  return (
    <div >
      <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`${metric.bgColor} p-4 rounded-lg shadow-sm`}
          >
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className={`text-2xl font-bold ${metric.textColor}`}>
              {metric.value}
            </p>
            <div className="flex items-center mt-2">
              {metric.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span 
                className={`text-xs ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.monthlyChange}% from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h4 className="text-lg font-semibold mb-4">Monthly Sales Breakdown</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
            <Bar dataKey="orders" fill="#10B981" name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;