import { FileText } from "lucide-react";

const PolicyList = ({ policies, selectedPolicy, onSelect }) => {
  return (
    <div className="w-full lg:w-64 bg-card rounded-lg border shadow-md overflow-hidden flex flex-col h-[calc(100vh-150px)]">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Policy Pages</h3>
        <div className="text-sm text-muted-foreground">
          {policies.length} Policies
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <ul className="divide-y">
          {policies.map((policy) => (
            <li key={policy}>
              <button
                onClick={() => onSelect(policy)}
                className={`w-full text-left p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                  selectedPolicy === policy
                    ? "bg-primary/20 border-l-4 border-primary"
                    : "hover:bg-accent"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="truncate">{policy}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PolicyList;
