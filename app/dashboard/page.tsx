import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return null; // Middleware will redirect, but this is a safeguard
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
    </div>
  );
}
