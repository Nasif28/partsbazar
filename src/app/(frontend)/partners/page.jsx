"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import partners from "@/data/Partners.json";
import PartnerCard from "@/components/Partners/PartnerCard";
import PageHeader from "@/components/Global/PageHeader";
import { Frown } from "lucide-react";

const TrustedPartnersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <PageHeader
        title="Our Trusted Partners"
        description="We're proud to collaborate with industry leaders who share our commitment to quality and innovation"
      />

      <section className="myContainer">
        <div className="container py-6">
          <div className="max-w-2xl mx-auto mb-6">
            <Input
              type="text"
              placeholder="Search partners by name, contact, phone, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-6 px-4 text-lg shadow-sm"
            />
          </div>

          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center">
                <Frown className="text-muted-foreground h-7 w-7" />
              </div>

              <h3 className="mt-4 text-xl font-medium text-gray-900">
                No partners found
              </h3>

              <p className="mt-2 text-gray-600">
                We couldn't find any partners matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TrustedPartnersPage;
