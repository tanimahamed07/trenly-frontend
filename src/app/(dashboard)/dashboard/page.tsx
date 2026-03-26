import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { redirect } from "next/navigation";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import UserOverview from "@/components/dashboard/user/UserOverview";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session?.user?.role;

  return <div>{role === "admin" ? <AdminOverview /> : <UserOverview />}</div>;
};

export default DashboardPage;
