#!/usr/bin/env python3
"""
Generate Unofficial WA Lens AI APRA Assessment Report
Creates HTML dashboard from assessment results

⚠️ UNOFFICIAL / FOR PROTOTYPING USE ONLY
"""

import json
import sys
from datetime import datetime

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WA Lens AI APRA Assessment Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #232F3E;
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header .subtitle {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .disclaimer {
            background: #FFF3CD;
            border: 1px solid #FFE69C;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 30px;
        }
        .score-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .score {
            font-size: 48px;
            font-weight: bold;
            color: #232F3E;
        }
        .score-label {
            color: #666;
            font-size: 14px;
        }
        .pillar {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .pillar h2 {
            margin-top: 0;
            color: #232F3E;
            border-bottom: 2px solid #FF9900;
            padding-bottom: 10px;
        }
        .question {
            padding: 15px;
            border-left: 4px solid #ddd;
            margin: 10px 0;
            background: #f9f9f9;
        }
        .question.passed {
            border-left-color: #28a745;
        }
        .question.failed {
            border-left-color: #dc3545;
        }
        .remediation {
            background: #e8f4fd;
            padding: 10px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏛️ WA Lens AI APRA Assessment Report</h1>
        <p class="subtitle">Unofficial Well-Architected Lens for AI Governance | Generated: {{timestamp}}</p>
    </div>
    
    <div class="disclaimer">
        <strong>⚠️ Disclaimer:</strong> This is an UNOFFICIAL, community-built assessment tool for prototyping use only. 
        It is NOT an official AWS service or guaranteed path to APRA compliance. 
        Production deployments require independent validation and professional compliance advice.
    </div>
    
    <div class="score-card">
        <div class="score">{{maturity_score}}/100</div>
        <div class="score-label">Overall Maturity Score</div>
        <p><strong>Level:</strong> {{maturity_level}}</p>
        <p><strong>Estimated Remediation Cost:</strong> ${{estimated_cost}}/month</p>
    </div>
    
    {{pillars}}
    
    <div class="footer">
        <p>WA Lens AI APRA v1.0 | Community-built | MIT License</p>
        <p>For official AWS guidance, contact your AWS Account Team or visit aws.amazon.com/architecture/well-architected/</p>
    </div>
</body>
</html>'''

def load_assessment():
    try:
        with open('assessment-results.json') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: assessment-results.json not found")
        print("Run assessment first: python3 ../survey.py")
        sys.exit(1)

def generate_pillar_html(pillar_data):
    html = f'<div class="pillar">\n'
    html += f'<h2>{pillar_data["name"]}</h2>\n'
    html += f'<p>{pillar_data["description"]}</p>\n'
    
    for question in pillar_data.get('questions', []):
        status = 'passed' if question.get('passed') else 'failed'
        html += f'<div class="question {status}">\n'
        html += f'<strong>Q: {question["text"]}</strong><br>\n'
        html += f'Status: {"✓ PASS" if status == "passed" else "✗ GAP"}<br>\n'
        
        if not question.get('passed') and 'remediation' in question:
            html += f'<div class="remediation">\n'
            html += f'<strong>Remediation:</strong> {question["remediation"]}<br>\n'
            html += f'<code>./deploy-fixes.sh --component {question["remediation_component"]}</code>\n'
            html += f'</div>\n'
        
        html += '</div>\n'
    
    html += '</div>\n'
    return html

def generate_report(data):
    pillars_html = ''
    for pillar in data.get('pillars', []):
        pillars_html += generate_pillar_html(pillar)
    
    report = TEMPLATE.replace('{{timestamp}}', datetime.now().strftime('%Y-%m-%d %H:%M'))
    report = report.replace('{{maturity_score}}', str(data.get('maturity_score', 0)))
    report = report.replace('{{maturity_level}}', data.get('maturity_level', 'Unknown'))
    report = report.replace('{{estimated_cost}}', str(data.get('estimated_cost', 0)))
    report = report.replace('{{pillars}}', pillars_html)
    
    return report

def main():
    if len(sys.argv) < 2:
        output_file = 'apra-ai-assessment-report.html'
    else:
        output_file = sys.argv[1]
    
    data = load_assessment()
    report = generate_report(data)
    
    with open(output_file, 'w') as f:
        f.write(report)
    
    print(f"Report generated: {output_file}")
    print(f"Open in browser to view results")

if __name__ == '__main__':
    main()