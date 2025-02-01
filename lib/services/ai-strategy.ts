interface Pool {
  id: string;
  name: string;
  token0: string;
  token1: string;
  apy: number;
  tvl: number;
  volume24h: number;
  riskScore: number;
}

interface Strategy {
  pool: Pool;
  recommendedAllocation: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

// Mock data for demonstration
const MOCK_POOLS: Pool[] = [
  {
    id: '1',
    name: 'ETH-USDC',
    token0: 'ETH',
    token1: 'USDC',
    apy: 15.5,
    tvl: 1000000,
    volume24h: 500000,
    riskScore: 3,
  },
  {
    id: '2',
    name: 'MNT-USDC',
    token0: 'MNT',
    token1: 'USDC',
    apy: 25.8,
    tvl: 500000,
    volume24h: 250000,
    riskScore: 5,
  },
  {
    id: '3',
    name: 'ETH-MNT',
    token0: 'ETH',
    token1: 'MNT',
    apy: 32.4,
    tvl: 250000,
    volume24h: 100000,
    riskScore: 7,
  },
];

export class AIStrategy {
  private pools: Pool[];

  constructor() {
    // In a real implementation, this would fetch data from the blockchain
    this.pools = MOCK_POOLS;
  }

  // Analyze pool metrics and return a risk score
  private analyzePoolRisk(pool: Pool): number {
    const tvlScore = Math.min(pool.tvl / 1000000, 1) * 3; // Max 3 points for TVL
    const volumeScore = Math.min(pool.volume24h / 500000, 1) * 2; // Max 2 points for volume
    const apyScore = Math.max(0, 5 - (pool.apy / 10)); // Higher APY = higher risk

    return 10 - (tvlScore + volumeScore + apyScore);
  }

  // Calculate expected return based on APY and risk
  private calculateExpectedReturn(pool: Pool): number {
    const riskAdjustment = 1 - (pool.riskScore / 10);
    return pool.apy * riskAdjustment;
  }

  // Get risk level based on score
  private getRiskLevel(score: number): 'low' | 'medium' | 'high' {
    if (score <= 3) return 'low';
    if (score <= 6) return 'medium';
    return 'high';
  }

  // Calculate confidence score based on pool metrics
  private calculateConfidence(pool: Pool): number {
    const tvlConfidence = Math.min(pool.tvl / 1000000, 1) * 40;
    const volumeConfidence = Math.min(pool.volume24h / 500000, 1) * 30;
    const riskConfidence = (10 - pool.riskScore) * 3;

    return Math.min(tvlConfidence + volumeConfidence + riskConfidence, 100);
  }

  // Get recommended strategies based on risk preference
  public getStrategies(riskPreference: 'conservative' | 'moderate' | 'aggressive'): Strategy[] {
    const maxRiskScore = {
      conservative: 4,
      moderate: 7,
      aggressive: 10,
    }[riskPreference];

    return this.pools
      .filter(pool => pool.riskScore <= maxRiskScore)
      .map(pool => ({
        pool,
        recommendedAllocation: 100 / this.pools.length,
        expectedReturn: this.calculateExpectedReturn(pool),
        riskLevel: this.getRiskLevel(pool.riskScore),
        confidence: this.calculateConfidence(pool),
      }))
      .sort((a, b) => b.expectedReturn - a.expectedReturn);
  }

  // Get all available pools
  public getPools(): Pool[] {
    return this.pools;
  }

  // Analyze a specific pool
  public analyzePool(poolId: string): Strategy | null {
    const pool = this.pools.find(p => p.id === poolId);
    if (!pool) return null;

    return {
      pool,
      recommendedAllocation: 100 / this.pools.length,
      expectedReturn: this.calculateExpectedReturn(pool),
      riskLevel: this.getRiskLevel(pool.riskScore),
      confidence: this.calculateConfidence(pool),
    };
  }
} 