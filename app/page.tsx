import { getData } from "@/lib/getData";

export default async function Home() {
  const data = await getData();

  const { suggestedMaxPriorityFeePerGas } = data.low;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {suggestedMaxPriorityFeePerGas}
    </main>
  );
}
