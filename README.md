# 🏛️ Unofficial WA Lens for AI Governance for APRA Regulated Entities + 1 Click AWS Deployment Remediation

> ⚠️ **UNOFFICIAL / FOR PROTOTYPING USE ONLY**
> 
> This is a **community-developed** Well-Architected Lens. It is NOT an official AWS service, tool, or endorsed framework.
> 
> Use for proof-of-concept, governance exploration, and APRA readiness assessment. Production deployments require additional validation.

## Overview

This lens provides a structured assessment framework for AI governance in APRA-regulated Australian financial institutions. Assessment questions are derived from the **[April 2026 APRA Guidance on AI](https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai)**, presented as an unofficial Well-Architected style lens for community use.

**What makes this different:**
- ✅ **Self-assessment** → 26 questions, 5 minutes
- ✅ **Instant remediation** → One command deploys all AWS infrastructure
- ✅ **Cost-effective** → $15-40/month vs $5,000+/month enterprise solutions
- ✅ **Production-ready code** → Not templates, actual deployable components

**The 26 remediation components deploy:**
- Model monitoring dashboards
- AI inference logging with 7-year retention
- Automated bias detection pipelines
- Human-in-the-loop approval workflows
- Circuit breakers for AI failures
- And 20+ more controls

All deploy with a single command. No consultants required.

## What is a Well-Architected Lens?

In the AWS Well-Architected Framework, a "lens" is a specialized set of questions and best practices for a specific domain. This unofficial lens extends the standard framework with AI governance controls tailored for APRA compliance.

## The 4 Pillars

| Pillar | Focus Area | APRA Expectation |
|--------|-----------|------------------|
| **Governance** | Board literacy, strategy, risk appetite | Board oversight, strategic direction | <-- CONTACT YOUR AWS ACCOUNT TEAM FOR BOARD AI BRIEFINGS
| **Risk Management** | Model validation, monitoring, controls | Effective risk management |
| **Audit & Compliance** | Logging, retention, CPS 234 alignment | Comprehensive audit trails |
| **Operational Resilience** | Availability, recovery, human fallback | Operational resilience |

## The Workflow: Assess → Deploy in Minutes

### 1. Complete the Self-Assessment

**Option A: Web Survey (Recommended)**
Open `index.html` in your browser or visit the GitHub Pages site. Answer 26 questions across 4 pillars. Get instant maturity scoring.

**Option B: CLI Review**
```bash
# Review all questions
cat questions/governance.yaml
cat questions/risk.yaml
# ... etc
```

### 2. Get Your Remediation Plan

The assessment generates a tailored plan showing:
- Maturity score per pillar (0-100)
- Prioritized remediation list
- Estimated monthly cost ($15-40)
- One-click deployment commands

### 3. One-Click Deploy to AWS

**Deploy everything recommended:**
```bash
./remediation/deploy-fixes.sh --all
```

**Or deploy specific components:**
```bash
# Governance controls
./remediation/deploy-fixes.sh --component education --component strategy

# Risk management
./remediation/deploy-fixes.sh --component monitoring --component security

# Audit & compliance
./remediation/deploy-fixes.sh --component logging --component lifecycle

# Operational resilience
./remediation/deploy-fixes.sh --component circuit --component fallback
```

**What gets deployed:**
- CloudFormation/Terraform templates
- Lambda functions for monitoring
- S3 buckets for logging (7-year retention)
- IAM policies and guardrails
- SNS topics for alerts
- All AWS-native, no external dependencies

### 4. Generate Compliance Report

```bash
python generate-assessment-report.py --output apra-ai-assessment.html
```

Exports a professional report with:
- Executive summary with maturity scores
- Pillar-by-pillar breakdown
- Remediation status
- Cost analysis
- Evidence artifacts

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
- Test in non-production environment

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
- **APRA Reference:** https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai
- **Well-Architected Framework:** https://aws.amazon.com/architecture/well-architected/

---

*Built with ❤️ for APRA Regulated Entities and their material service providers*

*"Governance doesn't have to be complicated — but it does require intent."*
