# APRA Alignment Analysis: Unofficial WA Lens AI APRA

## Source Document
**APRA Letter to Industry on Artificial Intelligence**  
April 2026 | https://www.apra.gov.au/apra-letter-to-industry-on-artificial-intelligence-ai

---

## Coverage Assessment: 20 Questions vs APRA Expectations

### ✅ STRONG ALIGNMENT (Directly addresses APRA themes)

| Our Question | APRA Theme | Alignment Score |
|--------------|-----------|-----------------|
| **gov-01**: Board AI literacy | "Boards are still developing technical literacy required to provide effective challenge" | 100% |
| **gov-02**: AI strategy documented | "AI strategy consistent with risk appetite and tolerance settings" | 100% |
| **gov-03**: Risk appetite statements | "set strategic direction... supported by effective monitoring" | 90% |
| **gov-04**: Executive accountability | "ownership and accountability across the AI lifecycle" | 100% |
| **gov-05**: Board approval process | "clearly defined triggers aligned to resilience objectives" | 80% |
| **risk-01**: Model inventory | "an inventory of AI tooling and AI use cases" | 100% |
| **risk-02**: Independent validation | "overreliance on vendor presentations without sufficient examination" | 90% |
| **risk-03**: Post-deployment monitoring | "weak controls over post deployment monitoring... models that learn, adapt and degrade" | 100% |
| **risk-04**: AI security controls | "prompt injection, data leakage, insecure integrations, exploit injection" | 85% |
| **risk-05**: Human-in-the-loop | "human involvement for high-risk decisions and accountability" | 100% |
| **audit-01**: Inference logging | "ability to understand model behaviour, material changes, performance issues" | 80% |
| **res-01**: RTOs defined | "credible fallback processes are required where AI supports critical operations" | 90% |
| **res-02**: Manual fallback | "fallback processes... where AI supports critical operations" | 100% |
| **res-03**: Circuit breakers | "clearly defined triggers aligned to resilience objectives to enable timely action" | 90% |
| **res-05**: Third-party monitoring | "mapping and maintain visibility over the full AI supply chain" | 80% |

### ⚠️ PARTIAL GAPS (Underrepresented in our questions)

| APRA Theme | Our Coverage | Gap Analysis |
|------------|-------------|--------------|
| **Agentic/Autonomous AI oversight** | risk-05 (human oversight) | Should add specific q on autonomous agent controls |
| **AI-generated code security** | risk-04 (general security) | Add specific q on AI-assisted development risks |
| **Fourth-party opacity** | res-05 (vendor monitoring) | Underemphasized — APRA specifically calls this out |
| **Patching at AI speed** | Not directly covered | Add to risk or resilience pillar |
| **Identity & Access for non-human actors** | Not covered | New question needed |
| **Decommissioning AI capabilities** | Not covered | Lifecycle question needed |
| **Staff experimentation outside controls** | Not covered | Governance question needed |
| **Audit rights in contracts** | Not covered | Supplier governance question |
| **Model explainability** | audit-01 (logging) | Should be explicit question |
| **Bias and fairness testing** | risk-02 (validation) | Should be explicit question |

### ❌ NOTABLE GAPS (Missing from our 20 questions)

1. **Non-human identity management** — "Identity and access management capabilities have not yet adjusted to nonhuman actors such as AI agents"

2. **AI code generation risks** — "AI assisted software development placing strain on change and release management controls"

3. **Exit/substitution testing** — "Few entities had demonstrated robust contingency planning or tested exit and substitution strategies"

4. **Staff shadow AI use** — "enterprise AI tools by staff outside approved control frameworks"

5. **Model explainability requirements** — "consideration of model purpose, limitations, explainability"

6. **Decommissioning** — "decommissioning of AI capabilities" — lifecycle gap

---

## Recommendations: Question Refinements

### Add 6 New Questions (Total: 26)

**GOVERNANCE (add 1)**
- Staff experimentation governance: "Do you have controls for staff AI use outside approved frameworks?"
  - APRA ref: "enterprise AI tools by staff outside approved control frameworks"

**RISK (add 3)**
- AI-generated code security: "Do you security-test AI-generated code before deployment?"
  - APRA ref: "security testing across AI-generated code, software components and libraries"

- Non-human identity management: "Do you manage AI agent identities and access like human users?"
  - APRA ref: "Identity and access management capabilities have not yet adjusted to nonhuman actors"

- Bias/fairness testing: "Do you test AI models for bias and fairness before deployment?"
  - APRA ref: "ethical considerations such as inherent bias"

**AUDIT (add 1)**
- Model explainability: "Can you explain AI model decisions to regulators and customers?"
  - APRA ref: "consideration of model purpose, limitations, explainability"

**RESILIENCE (add 1)**
- Exit/substitution tested: "Have you tested exit strategies for critical AI providers?"
  - APRA ref: "tested exit and substitution strategies for critical AI providers"

### Enhance 4 Existing Questions

**risk-02** (validation): Add option specifically about "AI-generated code red teaming"

**risk-04** (security): Add "patching at AI speed" dimension to options

**res-05** (vendor): Add "fourth-party visibility" as specific maturity level

**audit-03** (CPS 234): Add "audit rights for AI models in contracts" dimension

---

## Honest Verdict

### What We Got Right
✅ Board literacy and strategy — comprehensive coverage  
✅ Human-in-the-loop for high-risk — explicit and strong  
✅ Post-deployment monitoring — addresses APRA's "continuous vs point-in-time" concern  
✅ Model inventory — directly addresses APRA requirement  
✅ Operational resilience/fallback — well-covered  

### Where We're Light
⚠️ AI-generated code risks — mentioned but not explicit  
⚠️ Agentic AI oversight — single question, needs more depth  
⚠️ Fourth-party opacity — mentioned but not emphasized enough  
⚠️ Non-human IAM — completely missing  
⚠️ Exit/substitution testing — not covered  

### Pressure Test Score: 75/100

**Interpretation:** Strong foundation that hits APRA's major themes. Would pass as a credible starting point for AI governance assessment. To reach 90+, add the 6 recommended questions and enhance 4 existing ones.

**Risk:** Entities using only these 20 questions would miss: agentic AI controls, AI code security, non-human identity, and exit testing — all flagged by APRA as observed weaknesses.

---

## Suggested Immediate Actions

1. **Add 6 questions** to close gaps (estimated 30 min)
2. **Update risk-04** to explicitly mention "AI-generated code security testing"
3. **Update res-05** to elevate "fourth-party visibility" as distinct maturity level
4. **Document** in README: "Version 1.0 covers 75% of APRA themes; v1.1 will address remaining gaps"

---

*Analysis Date: April 30, 2026*  
*Document Version: APRA Letter April 2026*