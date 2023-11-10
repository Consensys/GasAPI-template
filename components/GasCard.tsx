import { getData } from "@/lib/getData";

export const GasCard = async () => {
    const data = await getData();
    return (
      <div className="border px-8 py-4 rounded-xl space-y-4">
        <div>
          <h2 className="font-semibold">Estimated base fee</h2>
          <p>gas price: {data?.estimatedBaseFee}</p>
        </div>
        <div>
          <h2 className="font-semibold">Historical base fee</h2>
          <p>gas price: {data?.historicalBaseFeeRange}</p>
        </div>
      </div>
    );
  };