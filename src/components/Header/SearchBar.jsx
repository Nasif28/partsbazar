"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const mockProducts = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Smartphone", category: "Electronics" },
  { id: 3, name: "Headphones", category: "Accessories" },
  { id: 4, name: "Keyboard", category: "Accessories" },
  { id: 5, name: "Mouse", category: "Accessories" },
  { id: 6, name: "Laptop2", category: "Electronics" },
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const debounce = (func) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), 1000);
    };
  };

  const handleSearch = debounce((term) => {
    if (term.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = mockProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div className="relative flex-1 max-w-2xl mx-2">
      <Input
        type="text"
        placeholder="Search for products..."
        className="pl-10 pr-4 py-6 rounded-full focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
        aria-hidden="true"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground rounded-lg shadow-lg border">
          <ul>
            {results.map((product) => (
              <li
                key={product.id}
                className="px-4 py-2 hover:bg-accent cursor-pointer"
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
