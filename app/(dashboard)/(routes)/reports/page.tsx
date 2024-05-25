import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">В стадии разработки</h1>
      </div>
    </div>
  )
}
