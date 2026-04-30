// Unofficial WA Lens AI APRA Survey Questions Data
// 26 questions across 4 pillars based on APRA April 2026 AI Guidance

const SURVEY_DATA = {
    pillars: [
        {
            id: 'governance',
            name: 'Governance',
            icon: '🏛️',
            description: 'Board oversight, AI strategy, and risk appetite',
            questions: [
                {
                    id: 'gov-01',
                    text: 'Does your Board have sufficient AI literacy to provide effective oversight?',
                    rationale: 'APRA requires boards to understand AI capabilities, limitations, and risks',
                    options: [
                        { value: 0, label: 'No Board AI education or awareness' },
                        { value: 25, label: 'Ad-hoc briefings, no formal program' },
                        { value: 50, label: 'Annual AI briefing to Board' },
                        { value: 75, label: 'Quarterly AI briefings with technical advisor' },
                        { value: 100, label: 'Board member with AI expertise, regular education program' }
                    ],
                    remediation: 'Deploy Board education materials: ./deploy-fixes.sh --component education'
                },
                {
                    id: 'gov-02',
                    text: 'Is your AI strategy formally documented and Board-approved?',
                    rationale: 'Undocumented strategy leads to misalignment between management and Board',
                    options: [
                        { value: 0, label: 'No AI strategy exists' },
                        { value: 25, label: 'Informal understanding, no documentation' },
                        { value: 50, label: 'Draft strategy, not Board-approved' },
                        { value: 75, label: 'Board-approved strategy but not regularly reviewed' },
                        { value: 100, label: 'Formal strategy, Board-approved, annual review cycle' }
                    ],
                    remediation: 'Deploy strategy templates: ./deploy-fixes.sh --component strategy'
                },
                {
                    id: 'gov-03',
                    text: 'Do you have AI-specific risk appetite statements?',
                    rationale: 'Generic risk appetite does not address AI-specific risks',
                    options: [
                        { value: 0, label: 'No risk appetite defined for AI' },
                        { value: 25, label: 'Generic risk appetite applied to AI' },
                        { value: 50, label: 'AI risks mentioned but not quantified' },
                        { value: 75, label: 'Quantified limits for some AI risks' },
                        { value: 100, label: 'Comprehensive AI risk appetite with metrics and thresholds' }
                    ],
                    remediation: 'Deploy risk appetite framework: ./deploy-fixes.sh --component appetite'
                },
                {
                    id: 'gov-04',
                    text: 'Is there a designated executive accountable for AI governance?',
                    rationale: 'Diffused accountability leads to gaps in oversight',
                    options: [
                        { value: 0, label: 'No clear AI ownership' },
                        { value: 25, label: 'Distributed across multiple teams' },
                        { value: 50, label: 'Mid-level manager assigned' },
                        { value: 75, label: 'Senior executive (VP/Director) accountable' },
                        { value: 100, label: 'C-level owner with Board reporting line' }
                    ],
                    remediation: 'Deploy RACI templates: ./deploy-fixes.sh --component accountability'
                },
                {
                    id: 'gov-05',
                    text: 'Do you have a process for Board approval of high-risk AI use cases?',
                    rationale: 'APRA expects constructive challenge for material AI deployments',
                    options: [
                        { value: 0, label: 'No approval process for AI use cases' },
                        { value: 25, label: 'Informal approval by line management' },
                        { value: 50, label: 'Risk team reviews high-risk cases' },
                        { value: 75, label: 'Formal risk committee approval for high-risk' },
                        { value: 100, label: 'Board or sub-committee approval for strategic AI' }
                    ],
                    remediation: 'Deploy approval workflow: ./deploy-fixes.sh --component workflow'
                },
                {
                    id: 'gov-06',
                    text: 'Do you have controls for staff AI experimentation outside approved frameworks?',
                    rationale: 'APRA observed staff using enterprise AI tools outside approved frameworks',
                    options: [
                        { value: 0, label: 'No controls, staff use any AI freely' },
                        { value: 25, label: 'Policy guidance only, no technical enforcement' },
                        { value: 50, label: 'DLP rules detect some unauthorized AI' },
                        { value: 75, label: 'Technical controls block unauthorized AI tools' },
                        { value: 100, label: 'Approved sandbox with monitoring and controls' }
                    ],
                    remediation: 'Deploy shadow AI controls: ./deploy-fixes.sh --component shadowcontrols'
                }
            ]
        },
        {
            id: 'risk',
            name: 'Risk Management',
            icon: '🛡️',
            description: 'Model validation, monitoring, and security',
            questions: [
                {
                    id: 'risk-01',
                    text: 'Do you maintain an inventory of all AI models in production?',
                    rationale: 'Unknown AI systems cannot be governed or risk-managed',
                    options: [
                        { value: 0, label: 'No inventory of AI models' },
                        { value: 25, label: 'Spreadsheet maintained ad-hoc' },
                        { value: 50, label: 'Central register with basic metadata' },
                        { value: 75, label: 'Automated discovery with risk ratings' },
                        { value: 100, label: 'Comprehensive registry with lifecycle tracking' }
                    ],
                    remediation: 'Deploy model inventory: ./deploy-fixes.sh --component inventory'
                },
                {
                    id: 'risk-02',
                    text: 'What independent validation occurs before AI model deployment?',
                    rationale: 'APRA warns against over-reliance on vendor presentations',
                    options: [
                        { value: 0, label: 'No validation, deploy on vendor recommendation' },
                        { value: 25, label: 'Basic testing by development team' },
                        { value: 50, label: 'Security review separate from development' },
                        { value: 75, label: 'Red team assessment plus bias testing' },
                        { value: 100, label: 'Independent validation with adversarial testing' }
                    ],
                    remediation: 'Deploy CI/CD validation: ./deploy-fixes.sh --component validation'
                },
                {
                    id: 'risk-03',
                    text: 'Do you monitor models for drift, bias, or performance degradation?',
                    rationale: 'Models drift over time; continuous monitoring required',
                    options: [
                        { value: 0, label: 'No post-deployment monitoring' },
                        { value: 25, label: 'Manual periodic checks' },
                        { value: 50, label: 'Automated monitoring for some models' },
                        { value: 75, label: 'Comprehensive monitoring with dashboards' },
                        { value: 100, label: 'Real-time drift detection with auto-alerts' }
                    ],
                    remediation: 'Deploy monitoring: ./deploy-fixes.sh --component monitoring'
                },
                {
                    id: 'risk-04',
                    text: 'Are security controls in place for AI-specific threats?',
                    rationale: 'AI systems face novel attack vectors',
                    options: [
                        { value: 0, label: 'Traditional security only' },
                        { value: 25, label: 'Basic input validation' },
                        { value: 50, label: 'Prompt injection detection' },
                        { value: 75, label: 'Guardrails plus rate limiting' },
                        { value: 100, label: 'Comprehensive AI security framework' }
                    ],
                    remediation: 'Deploy security controls: ./deploy-fixes.sh --component security'
                },
                {
                    id: 'risk-05',
                    text: 'Do you have human-in-the-loop requirements for high-risk decisions?',
                    rationale: 'Fully automated high-risk decisions create concentration risk',
                    options: [
                        { value: 0, label: 'Fully automated, no human review' },
                        { value: 25, label: 'Humans can review but not required' },
                        { value: 50, label: 'Human review for flagged cases' },
                        { value: 75, label: 'Mandatory human review above thresholds' },
                        { value: 100, label: 'Tiered oversight with escalation triggers' }
                    ],
                    remediation: 'Deploy oversight: ./deploy-fixes.sh --component oversight'
                },
                {
                    id: 'risk-06',
                    text: 'Do you security-test AI-generated code before deployment?',
                    rationale: 'APRA warns AI-assisted development strains change controls',
                    options: [
                        { value: 0, label: 'No special testing for AI-generated code' },
                        { value: 25, label: 'Standard testing applied to all code' },
                        { value: 50, label: 'AI code flagged in version control' },
                        { value: 75, label: 'Automated SAST for AI contributions' },
                        { value: 100, label: 'Mandatory peer review plus security scanning' }
                    ],
                    remediation: 'Deploy AI code security: ./deploy-fixes.sh --component aicode'
                },
                {
                    id: 'risk-07',
                    text: 'Do you manage AI agent identities and access like human users?',
                    rationale: 'APRA notes identity management has not adjusted to non-human actors',
                    options: [
                        { value: 0, label: 'AI agents share human credentials' },
                        { value: 25, label: 'AI agents have service accounts' },
                        { value: 50, label: 'Limited scope service accounts' },
                        { value: 75, label: 'Regular access reviews for AI agents' },
                        { value: 100, label: 'Full IAM lifecycle for autonomous agents' }
                    ],
                    remediation: 'Deploy agent IAM: ./deploy-fixes.sh --component agentiam'
                },
                {
                    id: 'risk-08',
                    text: 'Do you test AI models for bias and fairness before deployment?',
                    rationale: 'APRA flags ethical considerations including inherent bias',
                    options: [
                        { value: 0, label: 'No bias testing conducted' },
                        { value: 25, label: 'Ad-hoc manual review for bias' },
                        { value: 50, label: 'Bias testing for high-risk models only' },
                        { value: 75, label: 'Automated testing across protected attributes' },
                        { value: 100, label: 'Comprehensive fairness framework with metrics' }
                    ],
                    remediation: 'Deploy bias testing: ./deploy-fixes.sh --component bias'
                }
            ]
        },
        {
            id: 'audit',
            name: 'Audit & Compliance',
            icon: '📋',
            description: 'Logging, retention, and CPS 234 alignment',
            questions: [
                {
                    id: 'audit-01',
                    text: 'Do you log AI inference inputs and outputs for audit?',
                    rationale: 'APRA requires ability to explain and reconstruct AI decisions',
                    options: [
                        { value: 0, label: 'No inference logging' },
                        { value: 25, label: 'Application logs only, not structured' },
                        { value: 50, label: 'Structured logs for some models' },
                        { value: 75, label: 'Comprehensive logging with immutability' },
                        { value: 100, label: 'Immutable logging with input/output hashing' }
                    ],
                    remediation: 'Deploy logging: ./deploy-fixes.sh --component logging'
                },
                {
                    id: 'audit-02',
                    text: 'Is AI decision data retained to support incident investigation?',
                    rationale: 'APRA AI guidance requires ability to reconstruct and explain AI decisions',
                    options: [
                        { value: 0, label: 'Standard retention only' },
                        { value: 25, label: 'Extended retention for some logs' },
                        { value: 50, label: 'Structured retention for AI decisions' },
                        { value: 75, label: 'Long-term retention with searchability' },
                        { value: 100, label: 'Automated lifecycle with regulatory inquiry support' }
                    ],
                    remediation: 'Deploy lifecycle: ./deploy-fixes.sh --component lifecycle'
                },
                {
                    id: 'audit-03',
                    text: 'Can you demonstrate compliance with CPS 234 for AI systems?',
                    rationale: 'CPS 234 applies to all information assets including AI',
                    options: [
                        { value: 0, label: 'AI assets not classified under CPS 234' },
                        { value: 25, label: 'Partial mapping of AI assets' },
                        { value: 50, label: 'AI assets classified, controls not tested' },
                        { value: 75, label: 'Controls implemented, some gaps' },
                        { value: 100, label: 'Full CPS 234 alignment with regular testing' }
                    ],
                    remediation: 'Deploy CPS234 mapping: ./deploy-fixes.sh --component cps234'
                },
                {
                    id: 'audit-04',
                    text: 'Do you have Board-level reporting on AI risk metrics?',
                    rationale: 'APRA expects regular reporting for oversight',
                    options: [
                        { value: 0, label: 'No AI-specific Board reporting' },
                        { value: 25, label: 'Ad-hoc reporting on incidents only' },
                        { value: 50, label: 'Annual AI risk summary to Board' },
                        { value: 75, label: 'Quarterly dashboard with key metrics' },
                        { value: 100, label: 'Real-time dashboard with automated distribution' }
                    ],
                    remediation: 'Deploy reporting: ./deploy-fixes.sh --component reporting'
                },
                {
                    id: 'audit-05',
                    text: 'Are AI systems included in internal and external audit scopes?',
                    rationale: 'AI often omitted from traditional audit approaches',
                    options: [
                        { value: 0, label: 'AI not covered by audit' },
                        { value: 25, label: 'AI mentioned but no specific procedures' },
                        { value: 50, label: 'Internal audit includes AI processes' },
                        { value: 75, label: 'AI-specific audit procedures defined' },
                        { value: 100, label: 'External audit includes AI competency' }
                    ],
                    remediation: 'Deploy audit scope: ./deploy-fixes.sh --component scope'
                },
                {
                    id: 'audit-06',
                    text: 'Can you explain AI model decisions to regulators and customers?',
                    rationale: 'APRA expects consideration of model purpose, limitations, explainability',
                    options: [
                        { value: 0, label: 'No explainability practices' },
                        { value: 25, label: 'Technical documentation only' },
                        { value: 50, label: 'Model cards for high-risk decisions' },
                        { value: 75, label: 'SHAP/LIME explanations available' },
                        { value: 100, label: 'Customer-facing explanations plus regulator docs' }
                    ],
                    remediation: 'Deploy explainability: ./deploy-fixes.sh --component explain'
                }
            ]
        },
        {
            id: 'resilience',
            name: 'Operational Resilience',
            icon: '🔧',
            description: 'Availability, recovery, and human fallback',
            questions: [
                {
                    id: 'res-01',
                    text: 'Do you have defined recovery time objectives (RTO) for critical AI systems?',
                    rationale: 'CPS 230 requires operational resilience with clear recovery targets',
                    options: [
                        { value: 0, label: 'No recovery targets defined' },
                        { value: 25, label: 'Generic IT RTOs applied to AI' },
                        { value: 50, label: 'AI-specific RTOs defined but not tested' },
                        { value: 75, label: 'RTOs defined, annual testing' },
                        { value: 100, label: 'RTOs with quarterly testing and documented runbooks' }
                    ],
                    remediation: 'Deploy RTO templates: ./deploy-fixes.sh --component rto'
                },
                {
                    id: 'res-02',
                    text: 'Can you operate critical business functions without AI if systems fail?',
                    rationale: 'Over-reliance on AI creates unacceptable concentration risk',
                    options: [
                        { value: 0, label: 'No manual fallback possible' },
                        { value: 25, label: 'Manual process exists but untested' },
                        { value: 50, label: 'Manual procedures documented' },
                        { value: 75, label: 'Regular fallback drills conducted' },
                        { value: 100, label: 'Seamless fallback with trained staff' }
                    ],
                    remediation: 'Deploy fallback: ./deploy-fixes.sh --component fallback'
                },
                {
                    id: 'res-03',
                    text: 'Do you have circuit breakers or kill switches for malfunctioning AI?',
                    rationale: 'Rapid response to model drift limits damage',
                    options: [
                        { value: 0, label: 'No kill switch capability' },
                        { value: 25, label: 'Manual disable takes hours' },
                        { value: 50, label: 'Manual kill switch within minutes' },
                        { value: 75, label: 'Automated circuit breakers for some metrics' },
                        { value: 100, label: 'Comprehensive automated circuit breakers' }
                    ],
                    remediation: 'Deploy circuit breakers: ./deploy-fixes.sh --component circuit'
                },
                {
                    id: 'res-04',
                    text: 'Are AI systems included in business continuity and disaster recovery plans?',
                    rationale: 'AI often omitted from traditional BCP/DR planning',
                    options: [
                        { value: 0, label: 'AI not in BCP/DR' },
                        { value: 25, label: 'Generic BCP mentions AI' },
                        { value: 50, label: 'AI-specific BCP procedures' },
                        { value: 75, label: 'AI BCP tested annually' },
                        { value: 100, label: 'AI DR with cross-region failover' }
                    ],
                    remediation: 'Deploy BCP integration: ./deploy-fixes.sh --component bcp'
                },
                {
                    id: 'res-05',
                    text: 'Do you monitor third-party AI dependencies?',
                    rationale: 'Cloud AI creates supply chain risks',
                    options: [
                        { value: 0, label: 'No vendor monitoring' },
                        { value: 25, label: 'Reactive incident response' },
                        { value: 50, label: 'Vendor SLAs monitored' },
                        { value: 75, label: 'SLA monitoring with alternative planning' },
                        { value: 100, label: 'Multi-vendor strategy with exit procedures' }
                    ],
                    remediation: 'Deploy vendor monitoring: ./deploy-fixes.sh --component vendor'
                },
                {
                    id: 'res-06',
                    text: 'Have you tested exit and substitution strategies for critical AI providers?',
                    rationale: 'APRA observed few entities had demonstrated robust contingency planning',
                    options: [
                        { value: 0, label: 'No exit planning' },
                        { value: 25, label: 'Exit strategy documented but not tested' },
                        { value: 50, label: 'Tabletop exercise conducted annually' },
                        { value: 75, label: 'Tested data portability annually' },
                        { value: 100, label: 'Full exit simulation with substitution validated' }
                    ],
                    remediation: 'Deploy exit testing: ./deploy-fixes.sh --component exittest'
                }
            ]
        }
    ]
};

const ALL_QUESTIONS = [];
SURVEY_DATA.pillars.forEach(pillar => {
    pillar.questions.forEach(q => {
        ALL_QUESTIONS.push({
            ...q,
            pillarId: pillar.id,
            pillarName: pillar.name,
            pillarIcon: pillar.icon
        });
    });
});
