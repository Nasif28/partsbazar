import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ManageProfilePage() {
  const user = {
    logo: "logo.png",
  };
  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-lg">Basic Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value="Nasif Jihan" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="phone">Your Phone</Label>
              <Input id="phone" value="+8801983794542" className="mt-1" />
            </div>

            <div>
              <Label>Photo</Label>
              <div className="flex items-center mt-1 space-x-4">
                <div className="relative w-16 h-16 rounded-full bg-card border-2 p-1 border-dashed border-input flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/${user.logo ? user.logo : "/logo.png"}`}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="">
                    Browse
                  </Button>
                  <Button variant="outline">Choose file</Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="password">Your Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="New Password"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="">Add New Address</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
