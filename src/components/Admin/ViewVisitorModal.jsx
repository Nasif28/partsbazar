"use client";

import { Globe, MapPin, Monitor, Calendar, X, PanelTop } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DateFormatter } from "../Global/DateFormatter";

export const ViewVisitorModal = ({ open, onClose, visitor }) => {
  if (!visitor) return null;

  const getLocationLink = () => {
    return `https://www.google.com/maps/search/?api=1&query=${visitor.latitude},${visitor.longitude}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Visitor Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-card border px-4 py-2 rounded-lg">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {visitor.ip}
              </h3>

              <div className="flex items-center space-x-2">
                <Switch
                  id="block-status"
                  checked={visitor.blocked}
                  className="data-[state=checked]:bg-primary"
                  disabled
                />
                <Label htmlFor="block-status">
                  {visitor.blocked ? "Blocked" : "Allowed"}
                </Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 bg-card border rounded-lg p-4">
              <h4 className="font-medium text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location Information
              </h4>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-medium">
                    {visitor.country} ({visitor.countryCode})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium">{visitor.region}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">City:</span>
                  <span className="font-medium">{visitor.city}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <a
                    href={getLocationLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {visitor.latitude}, {visitor.longitude}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-card border rounded-lg p-4">
              <h4 className="font-medium text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Visit Information
              </h4>

              <div className="text-sm space-y-2">
                <span className="text-muted-foreground">Last Visited:</span>
                <div className="flex gap-4">
                  <div className="flex justify-center items-center gap-1 text-sm">
                    Date:
                    <DateFormatter
                      date={visitor.lastVisited}
                      showAgo={false}
                      showTime={false}
                      textColor="foreground"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-1 text-sm">
                    Time:
                    <DateFormatter
                      date={visitor.lastVisited}
                      showAgo={false}
                      showDate={false}
                      textColor="foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-card border rounded-lg p-4">
              <h4 className="font-medium text-lg flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Device Information
              </h4>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Operating System:
                  </span>
                  <span className="font-medium">{visitor.os}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Browser:</span>
                  <span className="font-medium">{visitor.browser}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Device Type:</span>
                  <span className="font-medium">{visitor.device}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-card border rounded-lg p-4">
              <h4 className="font-medium text-lg flex items-center gap-2">
                <PanelTop className="w-5 h-5 text-primary" />
                Technical Details
              </h4>

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Version:</span>
                  <span className="font-mono">IPv4</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Network Provider:
                  </span>
                  <span>Unknown</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Proxy Detected:</span>
                  <span>No</span>
                </div>
              </div>
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
