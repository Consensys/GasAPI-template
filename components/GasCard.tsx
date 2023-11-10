import { getData } from "@/lib/getData";

export const GasCard = async () => {
  const data = await getData();

  const renderGasFeeEstimateCard = (
    estimate: GasFeeEstimate,
    title: string
  ) => (
    <div className="border px-4 py-2 rounded-xl space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <p>Max Priority Fee: {estimate.suggestedMaxPriorityFeePerGas}</p>
      <p>Max Fee Per Gas: {estimate.suggestedMaxFeePerGas}</p>
      <p>Min Wait Time: {estimate.minWaitTimeEstimate} seconds</p>
      <p>Max Wait Time: {estimate.maxWaitTimeEstimate} seconds</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderGasFeeEstimateCard(data?.low, "Low Gas Fee Estimate")}
        {renderGasFeeEstimateCard(data?.medium, "Medium Gas Fee Estimate")}
        {renderGasFeeEstimateCard(data?.high, "High Gas Fee Estimate")}
      </div>
      <div className="border px-8 py-4 rounded-xl space-y-4">
        <div>
          <h2 className="font-semibold">Estimated Base Fee</h2>
          <p>Gas Price: {data?.estimatedBaseFee}</p>
        </div>
        <div>
          <h2 className="font-semibold">Network Congestion</h2>
          <p>{data?.networkCongestion}</p>
        </div>
        <div>
          <h2 className="font-semibold">Latest Priority Fee Range</h2>
          <p>{data?.latestPriorityFeeRange.join(" - ")}</p>
        </div>
        <div>
          <h2 className="font-semibold">Historical Priority Fee Range</h2>
          <p>{data?.historicalPriorityFeeRange.join(" - ")}</p>
        </div>
        <div>
          <h2 className="font-semibold">Historical Base Fee Range</h2>
          <p>{data?.historicalBaseFeeRange.join(" - ")}</p>
        </div>
        <div>
          <h2 className="font-semibold">Priority Fee Trend</h2>
          <p>{data?.priorityFeeTrend}</p>
        </div>
        <div>
          <h2 className="font-semibold">Base Fee Trend</h2>
          <p>{data?.baseFeeTrend}</p>
        </div>
      </div>
    </div>
  );
};
