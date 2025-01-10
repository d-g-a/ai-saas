import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const  DashboardPage = () => {
  return (
    <div>
      <p>Landing Page (Protected)</p>
      <UserButton afterSwitchSessionUrl="/"/>

    </div>
  );
}

export default DashboardPage;
