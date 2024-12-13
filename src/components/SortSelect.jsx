import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// eslint-disable-next-line react/prop-types
const SortSelect = ({ handleSortChange, currentSort }) => {
  return (
    <Select 
      onValueChange={handleSortChange} 
      value={currentSort}
    >
      <SelectTrigger className="bg-custom-beige text-custom-brown rounded p-2 lg:w-[182px] w-32 shadow-none">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="available">Availability</SelectItem>
        <SelectItem value="lowPrice">Price: Low to High</SelectItem>
        <SelectItem value="HighPrice">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;