export interface HolderAnalysis {
  topHolderPct: number;
  top10Concentration: number;
  level: 'distributed' | 'moderate' | 'concentrated' | 'whale-dominated';
}

export function analyzeHolders(
  holders: Array<{ uiAmount: number }>,
  totalSupply: number
): HolderAnalysis {
  if (holders.length === 0 || totalSupply === 0) {
    return { topHolderPct: 0, top10Concentration: 0, level: 'distributed' };
  }

  const topHolderPct = (holders[0].uiAmount / totalSupply) * 100;
  const top10Total = holders.reduce((sum, h) => sum + h.uiAmount, 0);
  const top10Concentration = (top10Total / totalSupply) * 100;

  let level: HolderAnalysis['level'];
  if (top10Concentration > 80) level = 'whale-dominated';
  else if (top10Concentration > 50) level = 'concentrated';
  else if (top10Concentration > 30) level = 'moderate';
  else level = 'distributed';

  return { topHolderPct, top10Concentration, level };
}
