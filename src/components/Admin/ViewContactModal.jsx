"use client";

import { Calendar, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/Global/Tag";
import { DateFormatter } from "../Global/DateFormatter";

export const ViewContactModal = ({ open, onClose, contact }) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Contact Request Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-4">
          <div className="bg-card border rounded-lg p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <Tag status={contact.status} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:underline"
                >
                  {contact.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{contact.number}</span>
              </div>

              <div className="flex gap-4">
                <div className="flex justify-center items-center text-muted-foreground gap-1 text-sm">
                  Date:
                  <DateFormatter
                    date={contact.date}
                    showAgo={false}
                    showTime={false}
                  />
                </div>

                <div className="flex justify-center items-center text-muted-foreground gap-1 text-sm">
                  Time:
                  <DateFormatter
                    date={contact.date}
                    showAgo={false}
                    showDate={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 flex-1 min-w-[250px]">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">
                Subject: {contact.subject}
              </h3>
            </div>

            <div className="bg-card/10 border rounded-lg p-4 h-40 overflow-y-auto">
              <p className="whitespace-pre-line">{contact.message}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
