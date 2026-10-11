# Data notes archive

Archived from `frontend/src/data.json` `conversation_summary` (removed from the
published payload; the site only reads `all_coding_models`). Content preserved
verbatim below, rendered from JSON. Dated per the `date` field inside.

## date

2026-09-13 (fact-checked vs HuggingFace/Cognition/Sakana primary sources; GLM-5.2 Turbo deleted; V4.1 Flash fixed 552B/8B+16B/280GB/CED; SWE-2+Fugu Max+Fugu Ultra v2.0 added; Qwen3.8-Max-Preview retired; Nemotron 3.5 Lightning duplicate deduped)

## currency_assumption

1 USD = ₹95.12

## goal

Compare API costs versus local hardware for extremely high-volume agentic coding.

## workload

- **tokens_per_day**: 1000000000
- **tokens_per_week**: 7000000000
- **tokens_per_30_day_month**: 30000000000
- **tokens_per_365_day_year**: 365000000000
- **agentic_coding**: 100%
- **assumed_input_output_split**: 99% input / 1% output
- **daily_input_tokens**: 990000000
- **daily_output_tokens**: 10000000
- **loop**: read -> plan -> edit -> run -> inspect -> test -> fix -> repeat

## models_discussed

- Tencent Hy3
- DeepSeek V4 Flash-0731
- DeepSeek V4 Pro
- GPT-OSS-120B
- MiniMax M3
- Qwen3 Coder Next
- Qwen3 Coder 480B
- Grok 4.20
- Kimi K3
- GPT-5.6 Terra
- GPT-5.6 Sol
- Claude Fable 5

## uncached_api_estimates_inr_99pct_input_1pct_output

- **Tencent Hy3**:
  - **day**: None
  - **week**: None
  - **30_days**: None
  - **365_days**: None
  - **note**: CSV lists Hy3 as Free; local only
- **DeepSeek V4 Flash-0731**:
  - **day**: 13450
  - **week**: 94150
  - **30_days**: 403498
  - **365_days**: 4909224
- **GPT-OSS-120B**:
  - **day**: 3579
  - **week**: 25054
  - **30_days**: 107374
  - **365_days**: 1306378
- **Qwen3 Coder 480B**:
  - **day**: 39189
  - **week**: 274326
  - **30_days**: 1175682
  - **365_days**: 14304131
- **MiniMax M3**:
  - **day**: 29393
  - **week**: 205748
  - **30_days**: 881776
  - **365_days**: 10728281
- **Qwen3 Coder Next**:
  - **day**: None
  - **week**: None
  - **30_days**: None
  - **365_days**: None
  - **note**: no price in CSV; estimate from conversation
- **DeepSeek V4 Pro**:
  - **day**: 41791
  - **week**: 292537
  - **30_days**: 1253731
  - **365_days**: 15253727
- **Grok 4.20**:
  - **day**: 194045
  - **week**: 1358315
  - **30_days**: 5821350
  - **365_days**: 70826425
- **Kimi K3**:
  - **day**: 296774
  - **week**: 2077418
  - **30_days**: 8903220
  - **365_days**: 108322510
- **GPT-5.6 Terra**:
  - **day**: 199752
  - **week**: 1398264
  - **30_days**: 5992560
  - **365_days**: 72909480
- **GPT-5.6 Sol**:
  - **day**: 395699
  - **week**: 2769893
  - **30_days**: 11870970
  - **365_days**: 144430135
  - **note**: recomputed at Aug 21 promo rate $4/$20
- **Claude Fable 5**:
  - **day**: 989248
  - **week**: 6924736
  - **30_days**: 29677440
  - **365_days**: 361075520

## key_points

- At 1B tokens/day, recurring API costs become very large.
- DeepSeek V4 Flash-0731 was identified as a strong price/performance option.
- DeepSeek V4 Pro costs more but remains much cheaper than many frontier proprietary models.
- Kimi K3 has very high capability but much higher API cost than cheaper open models.
- Agentic coding can have very high repeated-context/cache-hit rates, which can radically change API cost.
- At 1B total tokens/day with 99% input, average output generation needed is about 116 tokens/sec if evenly distributed.

## cache_notes

- **DeepSeek V4 Flash**:
  - **uncached_input**: $0.14/M
  - **output**: $0.28/M
  - **cache_hit_input**: $0.0028/M
  - **difference**: 50x lower cached input price
- **Kimi K3**:
  - **uncached_input**: $3/M
  - **output**: $15/M
  - **cache_hit_input**: $0.30/M
- **note**: Actual agentic billing depends on cache-hit rate, context construction, tool outputs and provider.
- **DeepSeek V4.1 Flash (GA Sep 10)**:
  - **offpeak_input_miss**: $0.15/M
  - **offpeak_output**: $0.60/M
  - **offpeak_cache_hit_input**: $0.003/M
  - **peak_input_miss**: $0.30/M
  - **peak_output**: $1.20/M
  - **peak_cache_hit_input**: $0.006/M
  - **note**: api-docs.deepseek.com Sep 10: model deepseek-flash = V4.1 Flash; legacy deepseek-v4-flash/vision-exp retired+routed billed Flash; deepseek-v4-pro routed to V4.1 Flash Sep 14 12:00 Beijing until V4.1 Pro
- **DeepSeek V4 Flash (legacy, superseded)**:
  - **note**: Legacy aliases retired; served by V4.1 Flash and billed at Flash price. Old flat $0.14/$0.28 and derived off-peak $0.21/$0.66 rows in CSV kept for history with (legacy) flags.
- **DeepSeek V4.1 Flash weights**:
  - **note**: HF deepseek-ai/DeepSeek-V4.1-Flash Sep 10: MIT license, 763B total (~tiny active), 48 shards ~510GB FP8, ~382GB Q4, KV-cache compression headline, vision. Vendor evals @1M ctx minimal: TB2.1 90.6 / DeepSWE v1.1 74.2 / GPQA-D 90.9 / HLE-tools 63.9.

## local_hardware

- **target_models**:
  - Tencent Hy3
  - DeepSeek V4 Flash-0731
- **quantization**: 4-bit
- **approximate_memory**:
  - **Tencent Hy3**:
    - **total_parameters**: 295B
    - **active_parameters**: 21B
    - **theoretical_4bit_weights**: 147.5GB
    - **context**: 256K
  - **DeepSeek V4 Flash-0731**:
    - **total_parameters**: ~284B
    - **active_parameters**: ~13B
    - **theoretical_4bit_weights**: ~142GB
    - **context**: 1M
- **recommended_vram**: At least 192GB VRAM; more is preferable for KV cache, runtime overhead and concurrency.
- **preferred_build**:
  - **gpu**: 3 x NVIDIA RTX PRO 6000 Blackwell 96GB
  - **total_vram**: 288GB
  - **ram**: 256-512GB ECC
  - **cpu**: Threadripper Pro or EPYC-class workstation CPU
  - **storage**: 4-8TB NVMe
  - **os**: Linux
  - **runtime**:
    - vLLM
    - SGLang
    - llama.cpp depending on quantization/runtime support
  - **estimated_india_total**: ₹50-60 lakh
- **alternative_build**:
  - **gpu**: 2 x RTX PRO 6000 Blackwell 96GB
  - **total_vram**: 192GB
  - **estimated_india_total**: roughly ₹39-56 lakh
  - **note**: Tighter memory headroom.
- **consumer_gpu_alternative**:
  - **gpu**: 6 x RTX 5090 32GB
  - **total_vram**: 192GB
  - **note**: Potentially workable but much harder because of PCIe lanes, power, cooling, physical space and GPU-to-GPU communication.
- **illustrative_power**:
  - **system_average**: 2.0-2.5kW
  - **annual_energy_at_2.5kw**: 21,900kWh
  - **example_rate**: ₹8/kWh
  - **example_annual_electricity**: ₹1.75 lakh
- **example_economics**:
  - **hardware**: roughly ₹50 lakh
  - **DeepSeek_V4_Flash_uncached_api**: roughly ₹49 lakh/year under the 99% input / 1% output assumption
  - **caveat**: High cache-hit rates can make API substantially cheaper.

## conclusion

For sustained 1B-token/day agentic coding, local open-weight inference can make economic sense, especially with high utilization and uncached API traffic. A hybrid setup—local open models for routine work and frontier APIs for difficult reasoning/review—may be optimal.

## correction

The conversation mentioned DeepSeek V4 Flash-0732 once; the model actually discussed was DeepSeek V4 Flash-0731 / DeepSeek V4 Flash. | Aug 15, 2026 fixes: Kimi K3 active params corrected to 104B (Kimi K3 License, custom, not Modified MIT/50B); DeepSeek V4 Flash Max (rank-16) repriced to official $0.14/$0.28; MiniMax M3 license = Modified MIT; KAT-Coder-Pro V2.5 repriced to $0.74/$2.96; added Qwen3.8-27B, DeepSeek V4 Pro 0813, Nemotron 3.5 Lightning, Ling 3.0 Tiny. | GLM-5.3 (Aug 14) added: same 743B/40B base as GLM-5.2, post-training only; TB2.1 88.2, HLE-tools 62.5, AutomationBench 48.2, CyberGym 84.5; API/Coding Plan live, open weights promised ~2 wks (safety-gated); per-Mtok pricing not yet published.

## model_name_mapping

- **Tencent Hy3**: Hy3
- **DeepSeek V4 Flash-0731**: DeepSeek V4 Flash (official -0731)
- **GPT-OSS-120B**: GPT-OSS-120B
- **Qwen3 Coder 480B**: Qwen3 Coder 480B-A35B
- **MiniMax M3**: MiniMax M3
- **Qwen3 Coder Next**: Qwen3 Coder Next
- **DeepSeek V4 Pro**: DeepSeek V4 Pro
- **Grok 4.20**: Grok 4.20
- **Kimi K3**: Kimi K3
- **GPT-5.6 Terra**: GPT-5.6 Terra
- **GPT-5.6 Sol**: GPT-5.6 Sol
- **Claude Fable 5**: Claude Fable 5

## price_notes

- **price_source_date**: 2026-08-27
- **july_30_price_cuts_applied**:
  - **GPT-5.6 Luna**:
    - 0.2
    - 1.2
  - **GPT-5.6 Luna Pro**:
    - 0.2
    - 1.2
  - **GPT-5.6 Terra**:
    - 2
    - 12
- **currency_assumption_usd_to_inr**: 95.12
- **cross_file_rates**:
  - **standardized_2026_08_14**: 95.12
  - **note**: all files standardized to 1 USD = ₹95.12 (previously 95.17 / 96.50 / 83 across files)
- **aug_21_gpt56_sol_promo**:
  - **GPT-5.6 Sol**:
    - 4
    - 20
  - **note**: promo $4/$20 from Aug 21, 2026, through at least Nov 21, 2026 (was $5/$30)
- **aug_16_deepseek_peak_offpeak**:
  - **note**: from Aug 16 16:00 UTC, peak hours 01-04 & 06-10 UTC; figures stored are OFF-PEAK rates; peak = 2x (V4 Pro $1.32/$3.96, V4 Flash $0.22/$1.32); old flat rates were $0.435/$0.87 and $0.14/$0.28. V4 Flash OUTPUT off-peak $0.66 / peak $1.32 is verified (dumbbell chart); V4 Flash INPUT is DERIVED (old $0.14 x Pro's off-peak multiplier 0.66/0.435), not published directly. CSV/JSON store OFF-PEAK rates.
  - **V4_Pro_offpeak**:
    - 0.66
    - 1.98
  - **V4_Pro_peak**:
    - 1.32
    - 3.96
  - **V4_Flash_offpeak**:
    - 0.21
    - 0.66
  - **V4_Flash_peak**:
    - 0.42
    - 1.32
- **aug_2026_price_events**:
  - Claude Sonnet 5: scheduled Sep 1 rise to $3/$15 CANCELLED; $2/$10 is now standard price
  - Gemini 3.7 Flash & 3.6 Flash: intro $0.75/$3.75 confirmed to double to $1.50/$7.50 on Jan 1, 2027
  - GLM-5.3 rate card: $1.40/$4.40 (cached $0.26) - identical to GLM-5.2/5.1
  - GPT-5.6 Sol: $5/$30 -> $4/$20 promo Aug 21 (through Nov 21, 2026)
- **new_models_aug16_27**:
  - **GLM-5.3-Flash**: Aug 26; the 'Ox Alpha' stealth model; 320B-A18B MoE; 1M ctx; first natively multimodal GLM-5 (text/image/video in, text out); MIT; ~306 GiB FP8 checkpoint, 8-GPU Hopper node min; $0.15/$0.50 (cached $0.03), launch promo halves rates to Sep 9; AA Intelligence Index 57 = Claude Opus 4.8; vendor TB2.1 84.3 / DeepSWE 63.4 / AutomationBench 48.8
  - **Granite 4.2 8B**: IBM, Aug 26, AA-evaluated
  - **LFM2.5-2.6B**: LiquidAI, Aug 19, AA-evaluated
- **sep10_online_reverification**:
  - **V4_1_Flash_offpeak**:
    - 0.15
    - 0.6
  - **V4_1_Flash_peak**:
    - 0.3
    - 1.2
  - **V4_1_Flash_cache_hit_in**:
    - **offpeak**: 0.003
    - **peak**: 0.006
  - **V4_Pro_offpeak**:
    - 0.66
    - 1.98
  - **V4_Pro_peak**:
    - 1.32
    - 3.96
  - **Fable_5_1**:
    - 10
    - 50
  - **Fable_5_1_cache_read**: 0.25
  - **Opus_5**:
    - 5
    - 25
  - **Opus_5_cache_read**: 0.5
  - **Sonnet_5**:
    - 2
    - 10
  - **Sonnet_5_note**: Sep 1 rise to $3/$15 cancelled; $2/$10 standard
  - **Gemini_38_Flash**:
    - 0.75
    - 3.75
  - **Gemini_36_37_Flash_note**: intro $0.75/$3.75 to Dec 31 2026 then $1.50/$7.50
  - **Astra**:
    - 10
    - 50
  - **Astra_cache**: 1
  - **Astra_Pro_ctx**: 1.05M
  - **Ling_Fin_weights**: posted Sep 4 MIT, DeepInfra $0.06/$0.18
  - **Sante_weights**: Sante-specific weights unconfirmed; base family MIT; API-first free thru Oct 4 Vercel
  - **AA_v4_3**: Fable 5.1 max/xhigh 53 top; Astra max/xhigh 53; best open GLM-5.3 max 45 > K3 max 44 > GLM-Flash 42
