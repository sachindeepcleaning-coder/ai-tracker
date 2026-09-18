/**
 * Local hardware tiers + VRAM fit heuristic.
 */

export const hardwareTiers = [
  { id: '1x5090', label: '1× RTX 5090 32GB', vram: 32, cost: '₹5L', tok: '~200 tok/s Qwen27B' },
  { id: '2x5090', label: '2× 5090 64GB', vram: 64, cost: '₹10-11L', tok: 'V4 Flash offload ~25' },
  { id: '4x5090', label: '4× 5090 128GB', vram: 128, cost: '₹25-30L', tok: 'Q3 ~60-80' },
  { id: '1xPro6000', label: '1× Pro 6000 96GB', vram: 96, cost: '₹40-48L', tok: 'Qwen ~200' },
  { id: '2xPro6000', label: '2× Pro 6000 192GB', vram: 192, cost: '₹85L-1Cr', tok: 'V4 Flash 243 tok/s FP8' },
  { id: '4xSpark', label: '4× DGX Spark 512GB', vram: 512, cost: '₹22-30L', tok: 'GLM-5.3 25-35' },
  { id: 'B300', label: 'DGX B300 2.1TB', vram: 2100, cost: '₹5.5Cr', tok: 'All models' },
]

/**
 * Weights-only fit (docs note +10-15GB runtime + KV on top), so:
 *  - q4 <= 85% of VRAM  -> comfortable 'fit' (headroom for runtime + KV)
 *  - q4 <= 115% of VRAM -> 'tight' (needs offload / quant / KV tricks)
 *  - anything larger    -> 'no'
 */
export function fitsModel(q4, tierVram) {
  if (q4 == null) return null
  if (q4 <= tierVram * 0.85) return 'fit'
  if (q4 <= tierVram * 1.15) return 'tight'
  return 'no'
}