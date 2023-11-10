import { GasCard } from "@/components/GasCard";

export default async function Home() {
  return (
    <main className="flex gap-4 min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold">Gas Card</h1>
      <GasCard />
    </main>
  );
}
