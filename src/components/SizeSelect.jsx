// src/components/SizeSelect.jsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  const SizeSelect = () => {
    return (
        <Select >
        <SelectTrigger className="bg-custom-beige text-custom-brown rounded p-2 lg:w-[182px] w-32 shadow-none">
          <SelectValue placeholder="Select Size" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
        <SelectItem value="small" className="hover:bg-blue-100">Small</SelectItem>
        <SelectItem value="medium" className="hover:bg-blue-100">Medium</SelectItem>
        <SelectItem value="large" className="hover:bg-blue-100">Large</SelectItem>
        <SelectItem value="xl" className="hover:bg-blue-100">Extra Large</SelectItem>
      </SelectContent>
      </Select>
    );
  };
  
  export default SizeSelect;