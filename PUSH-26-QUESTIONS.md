# Push 26 Questions Update to GitHub

## Commands to run on HQ:

```powershell
cd C:\Users\vasuk\.openclaw\workspace\wa-lens-ai-apra

git add -A

git commit -m "feat: expand to 26 questions covering APRA April 2026 guidance

Add 6 new questions addressing identified gaps:
- Governance: Staff shadow AI controls (gov-06)
- Risk: AI code security, agent IAM, bias testing (risk-06/07/08)
- Audit: Model explainability (audit-06)
- Resilience: Exit/substitution testing (res-06)

Updated:
- All 4 pillar YAML files with new questions
- questions-data.js (26 questions)
- index.html (26 count, new descriptions)
- README.md (26 count, updated tables)
- survey.js (26 count)

Full coverage of APRA April 2026 AI Guidance themes."

git push origin master
```

## After push, verify at:
https://github.com/kdeath83/unofficial-wa-lens-ai-apra

## GitHub Pages will auto-update in ~1 minute
https://kdeath83.github.io/unofficial-wa-lens-ai-apra

## What changed:
- 20 → 26 questions
- New: Shadow AI controls, AI code security, Agent IAM, Bias testing, Explainability, Exit testing
- Updated pillar descriptions
- Full APRA April 2026 coverage