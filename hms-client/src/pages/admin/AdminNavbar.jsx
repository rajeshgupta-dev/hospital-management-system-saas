import { useSelector } from "react-redux";

export default function AdminNavbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold tracking-wide text-gray-700">
        Hospital Management System - Admin
      </h2>

      <div className="flex items-center gap-4">
        <p className="text-gray-600 text-sm font-medium">
          {user?.name || "Admin"}
        </p>

        <img
          src="/user.png"
          alt="Admin"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
}
