import { getAdmin } from "@/actions/admin";
import Header from "@/components/header";
import React, { Children } from "react";
import Sidebar from "./.components/sidebar";

const AdminLayout = async ({children}) => {
  const admin = await getAdmin();

  if (!admin.authorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="text-lg">You do not have access to this page.</p>
      </div>
    );
  }
  return (
    <div className="h-full">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-56 pt-28 h-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
