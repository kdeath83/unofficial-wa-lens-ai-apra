# Unofficial Well-Architected Lens: AI Governance for APRA

> ⚠️ **UNOFFICIAL / FOR PROTOTYPING USE ONLY**
> 
> This is a **community-developed** Well-Architected Lens. It is NOT an official AWS service, tool, or endorsed framework.
> 
> Use for proof-of-concept, governance exploration, and APRA readiness assessment. Production deployments require additional validation.

## Overview

This lens provides a structured assessment framework for AI governance in APRA-regulated Australian financial institutions. Assessment questions are derived from the **[April 2026 APRA Guidance on AI](https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai)**, presented as an unofficial Well-Architected style lens for community use.


## What is a Well-Architected Lens?

In the AWS Well-Architected Framework, a "lens" is a specialized set of questions and best practices for a specific domain. This unofficial lens extends the standard framework with AI governance controls tailored for APRA compliance.

## The 4 Pillars

| Pillar | Focus Area | APRA Expectation |
|--------|-----------|------------------|
| **Governance** | Board literacy, strategy, risk appetite | Board oversight, strategic direction |
| **Risk Management** | Model validation, monitoring, controls | Effective risk management |
| **Audit & Compliance** | Logging, retention, CPS 234 alignment | Comprehensive audit trails |
| **Operational Resilience** | Availability, recovery, human fallback | Operational resilience |

## Quick Start

### 1. Import the Lens (Conceptual)

This lens is provided as reference architecture. To use:
- Review the questions in `questions/`
- Assess your maturity against each pillar
- Deploy remediation components from `remediation/`

### 2. Run Assessment

```bash
# Review questions
cat questions/governance.yaml

# Deploy remediation for identified gaps
./remediation/deploy-fixes.sh --pillar governance --pillar audit
```

### 3. Generate Report

```bash
python generate-assessment-report.py --output apra-ai-assessment.html
```

## Cost Breakdown

| Component | Purpose | Monthly Cost |
|-----------|---------|--------------|
| Governance templates | Documentation, approval workflows, shadow AI controls | $0 |
| Risk scanning | Model validation, AI code security, bias testing | ~$10-25 |
| Audit logging | Inference logging, retention, explainability | ~$5 |
| Resilience controls | Failover, monitoring, exit testing | ~$5-10 |
| **TOTAL** | | **~$15-40** |

## Repository Structure

```
unofficial-wa-lens-ai-apra/
├── lens-definition.json          # Lens metadata
├── questions/                    # 4 pillar question sets
│   ├── governance.yaml
│   ├── risk.yaml
│   ├── audit.yaml
│   └── resilience.yaml
├── remediation/                  # One-click deployments
│   └── deploy-fixes.sh
├── reporting/                    # Assessment outputs
│   └── dashboard-template.json
├── DISCLAIMER.md                 # Legal notices
├── index.html                    # Web survey (GitHub Pages)
├── styles.css                    # Survey styling
├── questions-data.js             # Survey data
├── survey.js                     # Survey logic
├── generate-assessment-report.py # Report generator
└── README.md                     # This file
```

## Honest Assessment

### What This IS
- ✅ Reference architecture for AI governance
- ✅ Cost-optimized for prototyping
- ✅ Structured around Well-Architected patterns
- ✅ Suitable for APRA readiness exploration

### What This Is NOT
- ❌ Official AWS Well-Architected tool
- ❌ Guaranteed APRA compliance
- ❌ Production-grade without hardening
- ❌ Substitute for professional compliance advice

## Disclaimers

### Unofficial / Community-Built
This lens is developed by the community for educational purposes. It is:
- NOT an official AWS service
- NOT endorsed by AWS or APRA
- NOT guaranteed to achieve anything
- Provided "as is" without warranties

### For Prototyping Use
Suitable for:
- Proof-of-concept deployments
- Governance exploration
- Cost-conscious pilot programs
- APRA readiness assessment

Before production use:
- Conduct independent security review
- Engage APRA-regulated compliance advisors
- Test in non-production environment
- Consider enterprise governance platforms for scale

## Contributing

This is an open-source reference architecture. Contributions welcome:
- Additional questions for pillars
- Improved remediation scripts
- Cost optimizations
- Documentation improvements

**Not accepting:** Proprietary vendor integrations (keep it vendor-neutral).

## License

MIT License - For APRA-regulated Australian financial institutions and global FSI community.

## Support

- **Issues:** GitHub Issues tab
- **APRA Reference:** [https://www.apra.gov.au/ai-letter](https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai)
- **Well-Architected Framework:** https://aws.amazon.com/architecture/well-architected/

---

*Built with ❤️ for APRA Regulated Entities and their material service providers*

*"Governance doesn't have to be complicated — but it does require intent."*
