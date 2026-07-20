"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ManagePropertiesPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (session) api.getMyProperties().then((d) => setItems(d.items));
  }, [session]);

  if (isPending) return null;
  if (!session) {
    router.push("/login");
    return null;
  }

  async function handleDelete(id: string) {
    await api.deleteProperty(id);
    setItems((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Manage Your Properties</h1>

      {items.length === 0 ? (
        <p className="text-slate-400">You haven't listed any properties yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral text-slate-400">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Price</th>
                <th className="p-3">Views</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-t border-slate-800">
                  <td className="p-3 font-medium text-white">{p.title}</td>
                  <td className="p-3">{p.location}</td>
                  <td className="p-3">৳{p.price.toLocaleString()}</td>
                  <td className="p-3">{p.views}</td>
                  <td className="p-3 space-x-3">
                    <Link href={`/properties/${p._id}`} className="text-accent">View</Link>
                    <Link href={`/properties/edit/${p._id}`} className="text-white underline">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}