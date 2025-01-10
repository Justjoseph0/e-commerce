import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SizeSelect = ({ onSizeChange, selectedSize }) => {
  return (
    <Select onValueChange={onSizeChange} value={selectedSize}>
      <SelectTrigger className="bg-custom-beige text-custom-brown rounded p-2 lg:w-[182px] w-32 shadow-none">
        <SelectValue placeholder="Select Size" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
        <SelectItem value="s" className="hover:bg-blue-100">
          Small
        </SelectItem>
        <SelectItem value="m" className="hover:bg-blue-100">
          Medium
        </SelectItem>
        <SelectItem value="l" className="hover:bg-blue-100">
          Large
        </SelectItem>
        <SelectItem value="xl" className="hover:bg-blue-100">
          Extra Large
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

SizeSelect.propTypes = {
  onSizeChange: PropTypes.func.isRequired,
  selectedSize: PropTypes.string.isRequired,
};

export default SizeSelect;
