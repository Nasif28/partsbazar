import React from "react";
import { Gem } from "lucide-react";
import { Card } from "@/components/ui/card";

const rewardPointsData = [
  { title: "Total Point", value: 1000, icon: Gem },
  { title: "Pending Point", value: 500, icon: Gem },
  { title: "Redeemed Point", value: 500, icon: Gem },
  { title: "Expired Point", value: 0, icon: Gem },
];
const RewardPointsPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">My Reward Points</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rewardPointsData.map((reward, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow p-4 rounded-none border-none"
          >
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-primary/20 p-2">
                {<reward.icon className="text-primary" />}
              </div>

              <div>
                <div className="text-2xl font-bold">{reward.value}</div>
                <div className="text-xs text-muted-foreground">
                  {reward.title}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RewardPointsPage;
