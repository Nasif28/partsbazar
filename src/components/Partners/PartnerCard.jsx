import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

const PartnerCard = ({ partner }) => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg border transition-all h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-center mb-4">
          <div className="bg-muted rounded-lg p-2 flex items-center justify-center h-32 w-full">
            <Image
              src={partner.thumbnail}
              alt={partner.name}
              width={120}
              height={80}
              className="object-contain max-h-28"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center">{partner.name}</h3>
        <p className="text-sm text-center text-muted-foreground">
          {partner.address}
        </p>

        <div className="text-center mt-3">
          <p className="font-semibold">{partner.contactPerson}</p>
          <p className="text-muted-foreground text-xs">{partner.designation}</p>
          <a
            href={`tel:${partner.phone}`}
            className="text-muted-foreground hover:text-primary"
          >
            {partner.phone}
          </a>
        </div>
      </div>

      <div className="p-2 border-t">
        <Button asChild className="w-full">
          <a
            href={partner.location}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center font-semibold"
          >
            <MapPin className="h-4 w-4 mr-2" /> View Location
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PartnerCard;
