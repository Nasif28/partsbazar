"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/Global/AdminPageHeader";
import PolicyList from "@/components/Admin/Frontend/PolicyList";
import PolicyEditor from "@/components/Admin/Frontend/PolicyEditor";
import { Input } from "@/components/ui/input";

const policyTypes = [
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
  "Return & Refund Policy",
  "Shipping Policy",
  "Seller Terms & Conditions",
  "Commission & Fee Policy",
  "Listing Guidelines",
  "Payment Terms",
  "Taxes & Invoicing Policy",
  "FAQ / Help Center",
  "Warranty Policy",
  "Security Policy",
  "Prohibited Items",
  "About Us",
  "Community Guidelines",
];

const AdminPoliciesPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPolicies = policyTypes.filter((policy) =>
    policy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedPolicy(null);
  };

  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    setIsCreating(false);
  };

  const handleSave = (content) => {
    console.log(
      `Saving content for ${selectedPolicy || "New Policy"}:`,
      content
    );
    // API call to save content
    setIsCreating(false);
    setSelectedPolicy(null);
  };

  return (
    <div>
      <AdminPageHeader
        title="Manage Policies"
        actions={
          <>
            <Input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80"
            />
            <Button onClick={handleCreateNew} className="w-full md:w-auto">
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          </>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        <PolicyList
          policies={filteredPolicies}
          selectedPolicy={selectedPolicy}
          onSelect={handleSelectPolicy}
        />

        <div className="flex-1 overflow-auto">
          {selectedPolicy ? (
            <PolicyEditor policyName={selectedPolicy} onSave={handleSave} />
          ) : isCreating ? (
            <PolicyEditor policyName="" onSave={handleSave} isCreating={true} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-muted rounded-full p-4 mb-4">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a Policy</h3>
              <p className="text-muted-foreground max-w-md">
                Choose a policy from the list to edit its content, or create a
                new policy page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPoliciesPage;
