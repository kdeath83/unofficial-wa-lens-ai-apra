// Unofficial WA Lens AI APRA Survey Logic
// ⚠️ UNOFFICIAL / FOR PROTOTYPING USE ONLY
let currentQuestion = 0;
const answers = {};
const totalQuestions = ALL_QUESTIONS.length;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('total-questions').textContent = totalQuestions;
});

function startSurvey() {
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('survey-section').style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    const q = ALL_QUESTIONS[currentQuestion];
    const card = document.getElementById('question-card');
    
    // Update progress
    document.getElementById('current-question').textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Build question HTML
    card.innerHTML = `
        <span class="pillar-header">${q.pillarIcon} ${q.pillarName}</span>
        <div class="question-number">Question ${currentQuestion + 1} of ${totalQuestions}</div>
        <div class="question-text">${q.text}</div>
        <div class="rationale">
            <strong>Why this matters:</strong> ${q.rationale}
        </div>
        <div class="options" id="options-${q.id}">
            ${q.options.map((opt, idx) => `
                <label class="option ${answers[q.id] === opt.value ? 'selected' : ''}" onclick="selectOption('${q.id}', ${opt.value})">
                    <input type="radio" name="${q.id}" value="${opt.value}" ${answers[q.id] === opt.value ? 'checked' : ''}>
                    <span class="option-text">${opt.label}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    // Update navigation
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = 'View Results →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

function selectOption(questionId, value) {
    answers[questionId] = value;
    
    // Update UI
    const options = document.querySelectorAll(`#options-${questionId} .option`);
    options.forEach((opt, idx) => {
        const optValue = ALL_QUESTIONS[currentQuestion].options[idx].value;
        opt.classList.toggle('selected', optValue === value);
    });
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function nextQuestion() {
    // Check if answered
    const q = ALL_QUESTIONS[currentQuestion];
    if (answers[q.id] === undefined) {
        alert('Please select an option before continuing.');
        return;
    }
    
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

function calculateScores() {
    const pillarScores = {};
    const totalByPillar = {};
    
    SURVEY_DATA.pillars.forEach(p => {
        pillarScores[p.id] = 0;
        totalByPillar[p.id] = 0;
    });
    
    ALL_QUESTIONS.forEach(q => {
        const score = answers[q.id] || 0;
        pillarScores[q.pillarId] += score;
        totalByPillar[q.pillarId] += 100; // Max per question
    });
    
    // Calculate percentages
    const results = {
        pillars: [],
        overall: 0,
        totalAnswered: Object.keys(answers).length,
        totalQuestions: ALL_QUESTIONS.length
    };
    
    let totalScore = 0;
    let totalMax = 0;
    
    SURVEY_DATA.pillars.forEach(p => {
        const score = pillarScores[p.id];
        const max = totalByPillar[p.id];
        const percentage = Math.round((score / max) * 100);
        
        totalScore += score;
        totalMax += max;
        
        results.pillars.push({
            id: p.id,
            name: p.name,
            icon: p.icon,
            description: p.description,
            score: percentage,
            rawScore: score,
            maxScore: max
        });
    });
    
    results.overall = Math.round((totalScore / totalMax) * 100);
    return results;
}

function getMaturityLevel(score) {
    if (score >= 80) return { level: 'Advanced', color: '#10A37F' };
    if (score >= 60) return { level: 'Developing', color: '#F59E0B' };
    if (score >= 40) return { level: 'Emerging', color: '#F59E0B' };
    return { level: 'Initial', color: '#EF4444' };
}

function getRecommendations(results) {
    const recs = [];
    const lowPillars = results.pillars.filter(p => p.score < 60);
    
    lowPillars.forEach(p => {
        // Find questions with low scores in this pillar
        const pillarQs = ALL_QUESTIONS.filter(q => q.pillarId === p.id);
        pillarQs.forEach(q => {
            const score = answers[q.id] || 0;
            if (score < 50) {
                recs.push({
                    pillar: p.name,
                    icon: p.icon,
                    question: q.text.substring(0, 60) + '...',
                    remediation: q.remediation,
                    priority: score < 25 ? 'High' : 'Medium'
                });
            }
        });
    });
    
    return recs.slice(0, 6); // Top 6 recommendations
}

function estimateCost(results) {
    // Base costs per component deployed
    const componentCosts = {
        education: 0,
        strategy: 0,
        appetite: 0,
        accountability: 0,
        workflow: 0,
        inventory: 0,
        validation: 0,
        monitoring: 15,
        security: 8,
        oversight: 0,
        logging: 8,
        lifecycle: 1,
        cps234: 0,
        reporting: 5,
        scope: 0,
        rto: 0,
        fallback: 0,
        circuit: 5,
        bcp: 0,
        vendor: 5
    };
    
    let total = 0;
    const lowPillars = results.pillars.filter(p => p.score < 60);
    
    lowPillars.forEach(p => {
        const pillarQs = ALL_QUESTIONS.filter(q => q.pillarId === p.id);
        pillarQs.forEach(q => {
            const score = answers[q.id] || 0;
            if (score < 50) {
                // Extract component from remediation string
                const match = q.remediation.match(/--component (\w+)/);
                if (match && componentCosts[match[1]]) {
                    total += componentCosts[match[1]];
                }
            }
        });
    });
    
    // Cap at reasonable range
    return Math.max(15, Math.min(total, 50));
}

function showResults() {
    const results = calculateScores();
    const maturity = getMaturityLevel(results.overall);
    const recs = getRecommendations(results);
    const cost = estimateCost(results);
    
    document.getElementById('survey-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    // Score circle
    document.getElementById('score-value').textContent = results.overall;
    document.getElementById('score-circle').style.setProperty('--score', results.overall);
    document.getElementById('maturity-level').textContent = 
        `${maturity.level} Maturity`;
    document.getElementById('maturity-level').style.color = maturity.color;
    
    // Pillar results
    const pillarsHtml = results.pillars.map(p => `
        <div class="pillar-result">
            <div class="pillar-info">
                <div class="pillar-name">${p.icon} ${p.name}</div>
                <div class="pillar-desc">${p.description}</div>
            </div>
            <div class="pillar-bar">
                <div class="pillar-fill" style="width: ${p.score}%"></div>
            </div>
            <div class="pillar-score">${p.score}%</div>
        </div>
    `).join('');
    
    document.getElementById('pillars-results').innerHTML = pillarsHtml;
    
    // Recommendations
    if (recs.length > 0) {
        const recsHtml = recs.map(r => `
            <div class="rec-item">
                <span class="rec-icon">${r.priority === 'High' ? '🔴' : '🟡'}</span>
                <div class="rec-content">
                    <div class="rec-title">${r.icon} ${r.pillar}</div>
                    <div class="rec-cost">${r.question}</div>
                    <code class="rec-command">${r.remediation}</code>
                </div>
            </div>
        `).join('');
        
        document.getElementById('rec-list').innerHTML = recsHtml;
    } else {
        document.getElementById('rec-list').innerHTML = `
            <div class="rec-item">
                <span class="rec-icon">🎉</span>
                <div class="rec-content">
                    <div class="rec-title">Strong Governance Posture</div>
                    <div class="rec-cost">Your AI governance practices are well-developed. Continue regular reviews.</div>
                </div>
            </div>
        `;
    }
    
    // Cost estimate
    document.getElementById('cost-amount').textContent = `$${cost}`;
    
    // JSON output
    const output = {
        timestamp: new Date().toISOString(),
        surveyVersion: '1.0.0',
        disclaimer: 'UNOFFICIAL / FOR PROTOTYPING USE ONLY',
        maturityScore: results.overall,
        maturityLevel: maturity.level,
        estimatedMonthlyCost: cost,
        pillarScores: results.pillars.reduce((acc, p) => {
            acc[p.id] = { score: p.score, max: 100 };
            return acc;
        }, {}),
        answers: answers,
        recommendations: recs
    };
    
    document.getElementById('json-output').textContent = JSON.stringify(output, null, 2);
    
    // Store for download
    window.assessmentResults = output;
}

function downloadReport() {
    const output = window.assessmentResults;
    if (!output) return;
    
    // Generate HTML report
    const html = generateHTMLReport(output);
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wa-lens-ai-apra-assessment-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateHTMLReport(data) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>WA Lens AI APRA Assessment Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; }
        h1 { color: #232F3E; }
        .disclaimer { background: #FEF3C7; padding: 16px; border-radius: 8px; margin: 20px 0; }
        .score { font-size: 48px; color: #FF9900; font-weight: bold; }
        .pillars { margin: 20px 0; }
        .pillar { padding: 12px; border-bottom: 1px solid #eee; }
        .rec { background: #f5f5f5; padding: 12px; margin: 8px 0; border-radius: 4px; }
        .footer { margin-top: 40px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <h1>🏛️ WA Lens AI APRA Assessment Report</h1>
    <p><strong>Generated:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    
    <div class="disclaimer">
        <strong>⚠️ Disclaimer:</strong> UNOFFICIAL / FOR PROTOTYPING USE ONLY. 
        This is a community-built tool. NOT an official AWS product. 
        NOT guaranteed APRA compliance.
    </div>
    
    <div class="score">${data.maturityScore}/100</div>
    <p><strong>Maturity Level:</strong> ${data.maturityLevel}</p>
    <p><strong>Estimated Monthly Cost:</strong> $${data.estimatedMonthlyCost}</p>
    
    <h2>Pillar Scores</h2>
    <div class="pillars">
        ${Object.entries(data.pillarScores).map(([id, s]) => 
            `<div class="pillar">${id}: ${s.score}%</div>`
        ).join('')}
    </div>
    
    <h2>Recommendations</h2>
    ${data.recommendations.map(r => `
        <div class="rec">
            <strong>${r.pillar}</strong><br>
            ${r.question}<br>
            <code>${r.remediation}</code>
        </div>
    `).join('')}
    
    <div class="footer">
        WA Lens AI APRA v1.0 | Community-built | MIT License<br>
        For official AWS guidance, contact your AWS Account Team.
    </div>
</body>
</html>`;
}

function restartSurvey() {
    currentQuestion = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'block';
}