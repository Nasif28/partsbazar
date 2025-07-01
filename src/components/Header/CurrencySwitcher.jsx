import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/redux/features/preferencesSlice";

const CurrencySwitcher = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.preferences.currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span>{currency}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => dispatch(setCurrency("BDT"))}>
          BDT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setCurrency("USD"))}>
          USD
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
