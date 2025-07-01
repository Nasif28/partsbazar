import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/features/preferencesSlice";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.preferences.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span>{language}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => dispatch(setLanguage("English"))}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("Bangla"))}>
          Bangla
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
