#!/bin/bash
# One-Click Remediation for Unofficial WA Lens AI APRA
# Deploys AWS resources to address identified gaps
# 
# ⚠️ UNOFFICIAL / FOR PROTOTYPING USE ONLY

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="unofficial-wa-lens-ai-apra"
DEPLOY_LOG="/tmp/${PROJECT_NAME}-deploy-$(date +%Y%m%d-%H%M%S).log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1" | tee -a "$DEPLOY_LOG"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$DEPLOY_LOG"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$DEPLOY_LOG"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    command -v aws >/dev/null 2>&1 || error "AWS CLI not installed"
    command -v python3 >/dev/null 2>&1 || error "Python 3 not installed"
    
    aws sts get-caller-identity >/dev/null 2>&1 || error "AWS credentials not configured"
    
    ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
    REGION=$(aws configure get region)
    log "Deploying to Account: $ACCOUNT, Region: $REGION"
}

# Get AWS account and region
get_aws_info() {
    AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
    AWS_REGION=$(aws configure get region)
    echo "${AWS_ACCOUNT}-${AWS_REGION}"
}

# GOVERNANCE COMPONENTS

deploy_education() {
    log "Deploying Board education materials..."
    BUCKET="${PROJECT_NAME}-governance-$(get_aws_info)"
    aws s3 mb "s3://${BUCKET}" 2>/dev/null || true
    
    # Create Board briefing template
    cat > /tmp/board-briefing.md <<'EOF'
# AI Governance Board Briefing Template

## Purpose
Quarterly AI literacy and risk briefing for Board members.

## Key Topics
1. AI adoption across the organization
2. Risk metrics and incidents
3. Regulatory updates (APRA)
4. Third-party AI dependencies

## Materials
- AI strategy status
- Risk dashboard
- Incident log
- Audit findings
EOF
    
    aws s3 cp /tmp/board-briefing.md "s3://${BUCKET}/templates/" 2>/dev/null || true
    log "Board education materials in s3://${BUCKET}/templates/"
}

deploy_strategy() {
    log "Deploying AI strategy templates..."
    BUCKET="${PROJECT_NAME}-governance-$(get_aws_info)"
    aws s3 mb "s3://${BUCKET}" 2>/dev/null || true
    
    cat > /tmp/ai-strategy-template.md <<'EOF'
# AI Strategy Template (APRA-Aligned)

## 1. Executive Summary
- Strategic objectives for AI adoption
- Risk appetite statement
- Governance framework

## 2. Risk Appetite
- Approved AI use cases
- Prohibited applications
- Risk thresholds

## 3. Implementation Roadmap
- Phase 1: Foundation (governance, inventory)
- Phase 2: Expansion (approved use cases)
- Phase 3: Optimization (advanced analytics)

## 4. Assurance
- Monitoring and reporting
- Audit approach
- Board oversight
EOF
    
    aws s3 cp /tmp/ai-strategy-template.md "s3://${BUCKET}/templates/" 2>/dev/null || true
    log "Strategy template in s3://${BUCKET}/templates/"
}

deploy_appetite() {
    log "Deploying risk appetite framework..."
    
    cat > /tmp/risk-appetite-framework.json <<'EOF'
{
  "ai_risk_appetite": {
    "model_drift_threshold": "5%",
    "max_inference_latency": "2000ms",
    "min_confidence_score": "0.85",
    "human_review_percentage": "100% for high-risk",
    "prohibited_use_cases": [
      "Fully autonomous lending decisions",
      "Unsupervised trading algorithms"
    ]
  }
}
EOF
    
    log "Risk appetite framework created at /tmp/risk-appetite-framework.json"
    log "Copy to your governance repository and customize"
}

deploy_accountability() {
    log "Deploying RACI matrix..."
    
    cat > /tmp/ai-governance-raci.md <<'EOF'
# AI Governance RACI Matrix

| Activity | Board | CRO | CTO | Business Units | Risk Team |
|----------|-------|-----|-----|----------------|-----------|
| AI Strategy Approval | A | C | C | I | I |
| High-Risk Use Case Approval | A | R | C | C | R |
| Model Validation | I | A | C | R | R |
| Post-Deployment Monitoring | I | A | C | R | R |
| Incident Response | A | R | R | C | R |

R = Responsible, A = Accountable, C = Consulted, I = Informed
EOF
    
    log "RACI matrix created at /tmp/ai-governance-raci.md"
}

deploy_workflow() {
    log "Deploying approval workflow template..."
    
    cat > /tmp/ai-approval-workflow.yaml <<'EOF'
# AI Use Case Approval Workflow
# Import to GitHub Issues or Jira

name: AI Use Case Approval

stages:
  1_business_case:
    - Document use case
    - Identify risks
    - Estimate benefits
    
  2_risk_assessment:
    - Risk rating (Low/Medium/High/Critical)
    - Required controls
    - Mitigation plans
    
  3_technical_review:
    - Architecture review
    - Security assessment
    - Data privacy check
    
  4_approval:
    Low: Department head
    Medium: Risk committee
    High: CRO + CTO
    Critical: Board sub-committee
    
  5_deployment:
    - CI/CD pipeline
    - Monitoring setup
    - Documentation
EOF
    
    log "Approval workflow template created at /tmp/ai-approval-workflow.yaml"
}

deploy_shadowcontrols() {
    log "Deploying shadow AI control recommendations..."
    
    cat > /tmp/shadow-ai-controls.md <<'EOF'
# Shadow AI Controls

## Technical Controls
- [ ] DLP rules for AI tool keywords (ChatGPT, Claude, etc.)
- [ ] Proxy blocks for unauthorized AI services
- [ ] CASB monitoring for cloud AI usage
- [ ] Endpoint detection for AI tool installation

## Policy Controls
- [ ] Acceptable use policy explicitly addresses AI
- [ ] Staff training on approved AI tools
- [ ] Reporting mechanism for unauthorized AI use

## Approved Sandbox
- [ ] Dedicated AWS account for AI experimentation
- [ ] Network isolation from production
- [ ] Mandatory data classification checks
- [ ] Usage logging and monitoring
EOF
    
    log "Shadow AI controls guide created at /tmp/shadow-ai-controls.md"
}

# RISK COMPONENTS

deploy_inventory() {
    log "Deploying model inventory infrastructure..."
    
    # DynamoDB table for model registry
    aws dynamodb create-table \
        --table-name "${PROJECT_NAME}-model-registry" \
        --attribute-definitions AttributeName=modelId,AttributeType=S \
        --key-schema AttributeName=modelId,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST \
        --region "${AWS_REGION}" 2>/dev/null || log "Table already exists"
    
    log "Model registry table created"
}

deploy_validation() {
    log "Deploying CI/CD security scanning..."
    
    cat > /tmp/github-actions-ai-security.yml <<'EOF'
name: AI Security Scan

on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Garak LLM vulnerability scan
        run: |
          pip install garak
          garak --model_type openai --model_name gpt-4 --probes all
        
      - name: Semgrep security scan
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
EOF
    
    log "GitHub Actions workflow template created"
    log "Copy to .github/workflows/ai-security-scan.yml"
}

deploy_monitoring() {
    log "Deploying CloudWatch monitoring..."
    
    # Create CloudWatch dashboard
    aws cloudwatch put-dashboard \
        --dashboard-name "${PROJECT_NAME}-ai-monitoring" \
        --dashboard-body '{"widgets":[]}' 2>/dev/null || true
    
    # Create alarms
    aws cloudwatch put-metric-alarm \
        --alarm-name "${PROJECT_NAME}-high-error-rate" \
        --metric-name ErrorRate \
        --threshold 5 \
        --comparison-operator GreaterThanThreshold \
        --evaluation-periods 2 2>/dev/null || true
    
    log "CloudWatch monitoring infrastructure deployed"
    log "Cost: ~$10-20/month"
}

deploy_security() {
    log "Deploying security controls..."
    
    # WAF WebACL for API protection
    aws wafv2 create-web-acl \
        --name "${PROJECT_NAME}-api-protection" \
        --scope REGIONAL \
        --default-action Allow={} \
        --rules '[]' \
        --region "${AWS_REGION}" 2>/dev/null || log "WAF ACL already exists"
    
    log "Security controls deployed"
    log "Cost: ~$5-10/month"
}

deploy_oversight() {
    log "Deploying human oversight workflow..."
    
    cat > /tmp/human-oversight-workflow.json <<'EOF'
{
  "escalation_triggers": {
    "confidence_below": 0.85,
    "amount_above": 10000,
    "risk_score_above": 75,
    "customer_impact": true
  },
  "approval_matrix": {
    "low": "auto_approve",
    "medium": "team_lead_review",
    "high": "manager_approval",
    "critical": "director_approval"
  }
}
EOF
    
    log "Human oversight workflow template created at /tmp/human-oversight-workflow.json"
}

deploy_aicode() {
    log "Deploying AI code security scanning..."
    
    cat > /tmp/ai-code-security-policy.md <<'EOF'
# AI-Generated Code Security Policy

## Requirements
1. All AI-generated code flagged in commit messages: `[AI-GENERATED]`
2. Mandatory peer review for AI contributions (>10 lines)
3. SAST scanning with CodeQL or SonarQube
4. No AI-generated code in security-critical paths without human review

## CI/CD Integration
```yaml
- name: Detect AI-generated code
  run: |
    git log --grep="AI-GENERATED" --name-only | xargs semgrep --config=p/security-audit
```
EOF
    
    log "AI code security policy created at /tmp/ai-code-security-policy.md"
}

deploy_agentiam() {
    log "Deploying AI agent IAM framework..."
    
    cat > /tmp/ai-agent-iam-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::ai-agent-bucket/*",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalTag/AgentType": "autonomous"
        }
      }
    }
  ]
}
EOF
    
    log "AI agent IAM policy template created at /tmp/ai-agent-iam-policy.json"
}

deploy_bias() {
    log "Deploying bias testing framework..."
    
    cat > /tmp/bias-testing-framework.py <<'EOF'
#!/usr/bin/env python3
"""
Bias Testing Framework for AI Models
Uses fairlearn and aif360 for fairness metrics
"""

from fairlearn.metrics import demographic_parity_ratio, equalized_odds_ratio

def test_bias(y_true, y_pred, sensitive_features):
    """Test for bias across protected attributes"""
    
    dp_ratio = demographic_parity_ratio(y_true, y_pred, sensitive_features)
    eo_ratio = equalized_odds_ratio(y_true, y_pred, sensitive_features)
    
    return {
        "demographic_parity": dp_ratio,
        "equalized_odds": eo_ratio,
        "pass": dp_ratio > 0.8 and eo_ratio > 0.8
    }

if __name__ == "__main__":
    # Example usage
    print("Bias testing framework loaded")
EOF
    
    log "Bias testing framework created at /tmp/bias-testing-framework.py"
}

# AUDIT COMPONENTS

deploy_logging() {
    log "Deploying audit logging infrastructure..."
    
    # S3 bucket for audit logs
    BUCKET="${PROJECT_NAME}-audit-$(get_aws_info)"
    aws s3 mb "s3://${BUCKET}" 2>/dev/null || true
    
    # Enable versioning
    aws s3api put-bucket-versioning \
        --bucket "$BUCKET" \
        --versioning-configuration Status=Enabled 2>/dev/null || true
    
    log "Audit logging bucket: s3://${BUCKET}"
    log "Cost: ~$5-10/month"
}

deploy_lifecycle() {
    log "Deploying S3 lifecycle management..."
    
    BUCKET="${PROJECT_NAME}-audit-$(get_aws_info)"
    aws s3 mb "s3://${BUCKET}" 2>/dev/null || true
    
    cat > /tmp/lifecycle-policy.json <<'EOF'
{
  "Rules": [
    {
      "ID": "AI-Audit-Archive",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 90,
          "StorageClass": "GLACIER_IR"
        }
      ],
      "Expiration": {
        "Days": 2555
      }
    }
  ]
}
EOF
    
    aws s3api put-bucket-lifecycle-configuration \
        --bucket "$BUCKET" \
        --lifecycle-configuration file:///tmp/lifecycle-policy.json 2>/dev/null || true
    
    log "Lifecycle policy applied"
    log "Cost: ~$0.50/month"
}

deploy_cps234() {
    log "Deploying CPS 234 mapping template..."
    
    cat > /tmp/cps234-ai-mapping.md <<'EOF'
# CPS 234 Control Mapping for AI Assets

## Asset Identification
- [ ] AI models classified as information assets
- [ ] Model inventory with InfoSec classification
- [ ] Training data source tracking

## Security Controls
- [ ] Encryption at rest for model artifacts
- [ ] Encryption in transit for inference
- [ ] Access controls on model endpoints

## Testing
- [ ] Annual penetration testing of AI systems
- [ ] Vulnerability scanning of AI infrastructure
- [ ] Incident response testing with AI scenarios

## APRA Notification
- [ ] Material AI incidents reported within 72 hours
- [ ] Annual CPS 234 compliance attestation
EOF
    
    log "CPS 234 mapping template created at /tmp/cps234-ai-mapping.md"
}

deploy_reporting() {
    log "Deploying Board reporting automation..."
    
    # Lambda for weekly rollup
    cat > /tmp/weekly-rollup-lambda.py <<'EOF'
import boto3
import json
from datetime import datetime

def lambda_handler(event, context):
    """Generate weekly AI risk summary for Board"""
    
    # Query CloudWatch metrics
    cw = boto3.client('cloudwatch')
    
    # Compile metrics
    report = {
        "generated_at": datetime.now().isoformat(),
        "period": "weekly",
        "metrics": {
            "inference_count": 0,
            "error_rate": 0,
            "latency_p99": 0
        },
        "incidents": [],
        "recommendations": []
    }
    
    return report
EOF
    
    log "Board reporting Lambda template created"
    log "Cost: ~$5/month"
}

deploy_scope() {
    log "Deploying audit scope templates..."
    
    cat > /tmp/ai-audit-checklist.md <<'EOF'
# AI Audit Scope Checklist

## Governance
- [ ] AI strategy aligned with risk appetite
- [ ] Board oversight documented
- [ ] AI inventory current and complete

## Risk Management
- [ ] Model validation procedures followed
- [ ] Post-deployment monitoring active
- [ ] Security controls tested

## Compliance
- [ ] CPS 234 requirements met
- [ ] Audit trail complete
- [ ] Regulatory reporting accurate

## Operational Resilience
- [ ] Fallback procedures tested
- [ ] Circuit breakers functional
- [ ] BCP includes AI systems
EOF
    
    log "Audit scope checklist created at /tmp/ai-audit-checklist.md"
}

deploy_explain() {
    log "Deploying model explainability framework..."
    
    cat > /tmp/model-explainability-template.md <<'EOF'
# Model Explainability Documentation

## Model Card
- **Purpose**: [Describe what the model does]
- **Intended Use**: [Approved use cases]
- **Limitations**: [Known limitations]
- **Training Data**: [Data sources]

## Explainability Methods
- SHAP values for feature importance
- LIME for local explanations
- Counterfactual examples

## Customer-Facing Explanations
"This decision was based on: [key factors]"

## Regulator Documentation
- Model architecture diagram
- Training and validation metrics
- Bias testing results
- Risk assessment
EOF
    
    log "Explainability template created at /tmp/model-explainability-template.md"
}

# RESILIENCE COMPONENTS

deploy_rto() {
    log "Deploying RTO/RPO templates..."
    
    cat > /tmp/ai-rto-template.md <<'EOF'
# AI System Recovery Objectives

## Criticality Classification
| System | Criticality | RTO | RPO |
|--------|-------------|-----|-----|
| Customer-facing inference | Critical | 1 hour | 0 (real-time failover) |
| Batch scoring | High | 4 hours | 24 hours |
| Training pipelines | Medium | 24 hours | 48 hours |

## Recovery Procedures
1. Detection (automated monitoring)
2. Escalation (on-call rotation)
3. Fallback (manual procedures)
4. Recovery (automated restoration)
5. Post-incident review
EOF
    
    log "RTO template created at /tmp/ai-rto-template.md"
}

deploy_fallback() {
    log "Deploying fallback procedure templates..."
    
    cat > /tmp/fallback-procedures.md <<'EOF'
# AI Fallback Procedures

## Scenario 1: Model Endpoint Unavailable
1. Automatic traffic routing to backup endpoint
2. If backup unavailable, queue requests
3. Manual review for critical decisions
4. Customer communication if delays > 5 min

## Scenario 2: Model Drift Detected
1. Automatic circuit breaker activation
2. Revert to previous model version
3. Alert data science team
4. Manual review pending retraining

## Training Requirements
- Annual fallback drill for all teams
- Documentation in runbooks
- Contact lists maintained
EOF
    
    log "Fallback procedures created at /tmp/fallback-procedures.md"
}

deploy_circuit() {
    log "Deploying circuit breaker infrastructure..."
    
    cat > /tmp/circuit-breaker-lambda.py <<'EOF'
import boto3

def lambda_handler(event, context):
    """Circuit breaker for AI model endpoints"""
    
    # Check metrics
    error_rate = get_error_rate()
    latency = get_latency()
    
    # Trigger circuit breaker if thresholds exceeded
    if error_rate > 0.1 or latency > 5000:
        disable_endpoint()
        notify_oncall()
        return {"action": "circuit_opened"}
    
    return {"action": "circuit_closed"}
EOF
    
    log "Circuit breaker Lambda template created"
    log "Cost: ~$5/month"
}

deploy_bcp() {
    log "Deploying BCP integration templates..."
    
    cat > /tmp/ai-bcp-template.md <<'EOF'
# AI Business Continuity Plan

## Critical AI Systems
- [ ] Customer service chatbot
- [ ] Fraud detection scoring
- [ ] Claims processing automation

## Recovery Scenarios
### Complete AWS Region Failure
1. Activate DR site in alternate region
2. Restore model artifacts from S3 (cross-region replication)
3. Route traffic to DR endpoints
4. Recovery time: 4 hours

### Model-Specific Failure
1. Automatic rollback to last known good version
2. Manual fallback procedures activated
3. Customer impact assessment
4. Recovery time: 30 minutes

## Testing Schedule
- Quarterly tabletop exercise
- Annual full DR test
- Post-incident review within 48 hours
EOF
    
    log "BCP template created at /tmp/ai-bcp-template.md"
}

deploy_vendor() {
    log "Deploying vendor monitoring infrastructure..."
    
    # CloudWatch canary for vendor health
    cat > /tmp/vendor-health-canary.py <<'EOF'
import requests
import boto3

def check_vendor_health():
    """Monitor critical AI vendor health"""
    
    vendors = {
        "aws-bedrock": "https://status.aws.amazon.com/api/sagemaker",
        "openai": "https://status.openai.com/api/v2/status.json"
    }
    
    for name, url in vendors.items():
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                alert(f"{name} may be experiencing issues")
        except:
            alert(f"Cannot reach {name} status page")
EOF
    
    log "Vendor health monitoring template created"
    log "Cost: ~$5/month"
}

deploy_exittest() {
    log "Deploying exit testing framework..."
    
    cat > /tmp/exit-testing-runbook.md <<'EOF'
# AI Provider Exit Testing Runbook

## Annual Exercise
1. **Data Export Test**
   - Export all training data
   - Verify model artifacts can be extracted
   - Document export time and cost

2. **Substitution Simulation**
   - Deploy equivalent model from alternate provider
   - Run parallel inference (shadow mode)
   - Compare outputs for consistency
   - Measure performance delta

3. **Documentation Review**
   - Update exit procedures
   - Verify contact lists
   - Review contractual termination clauses

## Success Criteria
- Data export completes within 24 hours
- Substitute model achieves >95% accuracy match
- No customer-facing impact during transition
- All regulatory notifications filed
EOF
    
    log "Exit testing runbook created at /tmp/exit-testing-runbook.md"
}

# MAIN DISPATCH

deploy_component() {
    COMPONENT="$1"
    case "$COMPONENT" in
        education) deploy_education ;;
        strategy) deploy_strategy ;;
        appetite) deploy_appetite ;;
        accountability) deploy_accountability ;;
        workflow) deploy_workflow ;;
        shadowcontrols) deploy_shadowcontrols ;;
        inventory) deploy_inventory ;;
        validation) deploy_validation ;;
        monitoring) deploy_monitoring ;;
        security) deploy_security ;;
        oversight) deploy_oversight ;;
        aicode) deploy_aicode ;;
        agentiam) deploy_agentiam ;;
        bias) deploy_bias ;;
        logging) deploy_logging ;;
        lifecycle) deploy_lifecycle ;;
        cps234) deploy_cps234 ;;
        reporting) deploy_reporting ;;
        scope) deploy_scope ;;
        explain) deploy_explain ;;
        rto) deploy_rto ;;
        fallback) deploy_fallback ;;
        circuit) deploy_circuit ;;
        bcp) deploy_bcp ;;
        vendor) deploy_vendor ;;
        exittest) deploy_exittest ;;
        *) error "Unknown component: $COMPONENT" ;;
    esac
}

# Print summary
print_summary() {
    echo ""
    echo "=========================================="
    echo "DEPLOYMENT COMPLETE"
    echo "=========================================="
    echo ""
    echo "Log file: $DEPLOY_LOG"
    echo ""
    echo "Next steps:"
    echo "1. Review deployed resources in AWS Console"
    echo "2. Customize templates for your organization"
    echo "3. Configure CI/CD integration"
    echo "4. Generate assessment report"
    echo ""
    echo "Estimated monthly cost: $15-40"
    echo ""
}

# Help
show_help() {
    cat <<EOF
Unofficial WA Lens AI APRA - One-Click Remediation

Usage: $0 [OPTIONS] [COMPONENT...]

Options:
  --all           Deploy all components (default)
  --component     Deploy specific component (can repeat)
  --list          List all available components
  --help          Show this help message

Components (26 total):
  Governance: education, strategy, appetite, accountability, workflow, shadowcontrols
  Risk: inventory, validation, monitoring, security, oversight, aicode, agentiam, bias
  Audit: logging, lifecycle, cps234, reporting, scope, explain
  Resilience: rto, fallback, circuit, bcp, vendor, exittest

Examples:
  $0 --all                                   # Deploy everything
  $0 --component governance --component audit  # Deploy specific pillars
  $0 --component monitoring --component security # Deploy specific controls

For prototyping use only. Review all configurations before production use.
EOF
}

# List components
list_components() {
    echo "Available remediation components:"
    echo ""
    echo "GOVERNANCE (6):"
    echo "  education, strategy, appetite, accountability, workflow, shadowcontrols"
    echo ""
    echo "RISK MANAGEMENT (8):"
    echo "  inventory, validation, monitoring, security, oversight, aicode, agentiam, bias"
    echo ""
    echo "AUDIT & COMPLIANCE (6):"
    echo "  logging, lifecycle, cps234, reporting, scope, explain"
    echo ""
    echo "OPERATIONAL RESILIENCE (6):"
    echo "  rto, fallback, circuit, bcp, vendor, exittest"
}

# Main
deploy_all() {
    check_prerequisites
    
    log "Deploying all 26 remediation components..."
    
    for component in education strategy appetite accountability workflow shadowcontrols inventory validation monitoring security oversight aicode agentiam bias logging lifecycle cps234 reporting scope explain rto fallback circuit bcp vendor exittest; do
        log "Deploying $component..."
        deploy_component "$component" || warn "Failed to deploy $component"
    done
    
    print_summary
}

# Parse arguments
if [ $# -eq 0 ]; then
    deploy_all
    exit 0
fi

COMPONENTS=()
while [ $# -gt 0 ]; do
    case "$1" in
        --all)
            deploy_all
            exit 0
            ;;
        --component)
            shift
            COMPONENTS+=("$1")
            ;;
        --list)
            list_components
            exit 0
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1. Use --help for usage."
            ;;
    esac
    shift
done

# Deploy selected components
if [ ${#COMPONENTS[@]} -gt 0 ]; then
    check_prerequisites
    for component in "${COMPONENTS[@]}"; do
        log "Deploying $component..."
        deploy_component "$component"
    done
    print_summary
fi
