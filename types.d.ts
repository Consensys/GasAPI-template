interface GasFeeEstimate {
    suggestedMaxPriorityFeePerGas: string;
    suggestedMaxFeePerGas: string;
    minWaitTimeEstimate: number;
    maxWaitTimeEstimate: number;
  }
  
  interface GasFeesApiResponse {
    low: GasFeeEstimate;
    medium: GasFeeEstimate;
    high: GasFeeEstimate;
    estimatedBaseFee: string;
    networkCongestion: number;
    latestPriorityFeeRange: string[];
    historicalPriorityFeeRange: string[];
    historicalBaseFeeRange: string[];
    priorityFeeTrend: 'up' | 'down';
    baseFeeTrend: 'up' | 'down';
  }