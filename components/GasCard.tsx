import { getData } from "@/lib/getData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GasCard = async () => {
  const data = await getData();

  const renderGasFeeEstimateCard = (
    estimate: GasFeeEstimate,
    title: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Max Priority Fee: {estimate.suggestedMaxPriorityFeePerGas}</p>
        <p>Max Fee Per Gas: {estimate.suggestedMaxFeePerGas}</p>
        <p>Min Wait Time: {estimate.minWaitTimeEstimate} seconds</p>
        <p>Max Wait Time: {estimate.maxWaitTimeEstimate} seconds</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.low &&
          renderGasFeeEstimateCard(data.low, "Low Gas Fee Estimate")}
        {data?.medium &&
          renderGasFeeEstimateCard(data.medium, "Medium Gas Fee Estimate")}
        {data?.high &&
          renderGasFeeEstimateCard(data.high, "High Gas Fee Estimate")}
      </div>
      <Card>
        <CardContent>
          <h2 className="font-semibold">Estimated Base Fee</h2>
          <p>Gas Price: {data?.estimatedBaseFee}</p>
          <h2 className="font-semibold">Network Congestion</h2>
          <p>{data?.networkCongestion}</p>
          <h2 className="font-semibold">Latest Priority Fee Range</h2>
          <p>{data?.latestPriorityFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Historical Priority Fee Range</h2>
          <p>{data?.historicalPriorityFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Historical Base Fee Range</h2>
          <p>{data?.historicalBaseFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Priority Fee Trend</h2>
          <p>{data?.priorityFeeTrend}</p>
          <h2 className="font-semibold">Base Fee Trend</h2>
          <p>{data?.baseFeeTrend}</p>
        </CardContent>
      </Card>
    </div>
  );
};
