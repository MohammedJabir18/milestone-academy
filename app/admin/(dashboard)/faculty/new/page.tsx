import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FacultyForm from "@/components/admin/FacultyForm";

export const metadata = {
  title: "Add New Faculty | Admin Dashboard",
};

export default function NewFacultyPage() {
  return (
    <div className="p-12 space-y-6 max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/faculty" 
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Add New Faculty</h2>
          <p className="text-stone-500 mt-1">Create a new mentor profile.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <FacultyForm />
      </div>
    </div>
  );
}
