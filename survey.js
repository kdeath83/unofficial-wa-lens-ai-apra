// Editorial AI Governance Assessment - Survey Logic
// Matches the warm, sophisticated aesthetic of the new UI

let currentQuestion = 0;
const answers = {};
const totalQuestions = ALL_QUESTIONS.length;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('Editorial AI Governance Assessment loaded');
});

function startAssessment() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('assessment').style.display = 'block';
  renderQuestion();
}

function showLanding() {
  document.getElementById('assessment').style.display = 'none';
  document.getElementById('landing').style.display = 'block';
}

function renderQuestion() {
  const q = ALL_QUESTIONS[currentQuestion];
  const container = document.getElementById('question-container');
  
  // Update progress
  document.getElementById('current-q').textContent = currentQuestion + 1;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  
  // Build question HTML with editorial styling
  container.innerHTML = `
    <div class="pillar-badge">
      <span>${q.pillarIcon}</span>
      <span>${q.pillarName}</span>
    </div>
    <h2 class="question-text">${q.text}</h2>
    <div class="question-rationale">
      <strong>Why this matters:</strong> ${q.rationale}
    </div>
    <div class="options-list" id="options-${q.id}">
      ${q.options.map((opt, idx) => `
        <label class="option ${answers[q.id] === opt.value ? 'selected' : ''}" onclick="selectOption('${q.id}', ${opt.value})">
          <input type="radio" name="${q.id}" value="${opt.value}" ${answers[q.id] === opt.value ? 'checked' : ''}>
          <span class="option-text">${opt.label}</span>
        </label>
      `).join('')}
    </div>
  `;
  
  // Update navigation buttons
  document.getElementById('prev-btn').disabled = currentQuestion === 0;
  
  const nextBtn = document.getElementById('next-btn');
  if (currentQuestion === totalQuestions - 1) {
    nextBtn.textContent = 'View Results';
  } else {
    nextBtn.textContent = 'Next';
  }
}

function selectOption(questionId, value) {
  answers[questionId] = value;
  
  // Update UI
  const options = document.querySelectorAll(`#options-${questionId} .option`);
  options.forEach((opt) => {
    const input = opt.querySelector('input');
    opt.classList.toggle('selected', parseInt(input.value) === value);
    if (parseInt(input.value) === value) {
      input.checked = true;
    }
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
    // Gentle shake animation on the options
    const options = document.querySelector('.options-list');
    options.style.animation = 'shake 0.3s ease';
    setTimeout(() => {
      options.style.animation = '';
    }, 300);
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
  if (score >= 80) return { level: 'Advanced', color: '#166534' };
  if (score >= 60) return { level: 'Developing', color: '#D97706' };
  if (score >= 40) return { level: 'Emerging', color: '#D97706' };
  return { level: 'Initial', color: '#DC2626' };
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
          question: q.text.substring(0, 80) + (q.text.length > 80 ? '...' : ''),
          remediation: q.remediation,
          priority: score < 25 ? 'High' : 'Medium'
        });
      }
    });
  });
  
  return recs.slice(0, 5); // Top 5 recommendations
}

function estimateCost(results) {
  // Base costs per component deployed
  const componentCosts = {
    education: 0,
    strategy: 0,
    appetite: 0,
    accountability: 0,
    workflow: 0,
    shadowcontrols: 0,
    inventory: 0,
    validation: 0,
    monitoring: 15,
    security: 8,
    oversight: 0,
    aicode: 0,
    agentiam: 0,
    bias: 0,
    logging: 8,
    lifecycle: 1,
    cps234: 0,
    reporting: 5,
    scope: 0,
    explain: 0,
    rto: 0,
    fallback: 0,
    circuit: 5,
    bcp: 0,
    vendor: 5,
    exittest: 0
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
  
  document.getElementById('assessment').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  
  // Animate score
  const scoreEl = document.getElementById('overall-score');
  animateNumber(scoreEl, 0, results.overall, 1000);
  
  // Maturity badge
  const badgeEl = document.getElementById('maturity-badge');
  badgeEl.textContent = maturity.level;
  badgeEl.style.backgroundColor = maturity.color;
  
  // Pillar results
  const pillarsHtml = results.pillars.map((p, idx) => `
    <div class="pillar-result">
      <div class="pillar-info">
        <h4>${p.icon} ${p.name}</h4>
        <p>${p.description}</p>
      </div>
      <div class="pillar-bar-container">
        <div class="pillar-bar">
          <div class="pillar-fill" style="width: 0%" data-width="${p.score}%"></div>
        </div>
        <div class="pillar-score">${p.score}%</div>
      </div>
    </div>
  `).join('');
  
  document.getElementById('pillars-results').innerHTML = pillarsHtml;
  
  // Animate pillar bars
  setTimeout(() => {
    document.querySelectorAll('.pillar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 100);
  
  // Recommendations with Deploy buttons
  if (recs.length > 0) {
    const recsHtml = recs.map((r, idx) => `
      <div class="rec-item">
        <span class="rec-priority ${r.priority.toLowerCase()}">${r.priority}</span>
        <div class="rec-content">
          <div class="rec-pillar">${r.icon} ${r.pillar}</div>
          <div class="rec-title">${r.question}</div>
          <button class="btn-deploy" onclick="deployRemediation('${r.remediation}', ${idx})">Deploy</button>
        </div>
      </div>
    `).join('');
    
    document.getElementById('rec-list').innerHTML = recsHtml;
  } else {
    document.getElementById('rec-list').innerHTML = `
      <div class="rec-item" style="border-color: #BBF7D0; background: #F0FDF4;">
        <span style="font-size: 24px;">🎉</span>
        <div class="rec-content">
          <div class="rec-title" style="color: #166534;">Strong Governance Posture</div>
          <div style="color: #15803D;">Your AI governance practices are well-developed. Continue regular reviews and monitoring.</div>
        </div>
      </div>
    `;
  }
  
  // Store for download
  window.assessmentResults = {
    timestamp: new Date().toISOString(),
    surveyVersion: '1.0.0',
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
}

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

function downloadReport() {
  const output = window.assessmentResults;
  if (!output) {
    alert('No assessment results to download. Please complete the assessment first.');
    return;
  }
  
  const html = generateHTMLReport(output);
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-governance-assessment-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateHTMLReport(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI Governance Assessment Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;450;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #F5F2EB;
      --bg-card: #FFFFFF;
      --accent-gold: #C9A962;
      --text-primary: #2D2A26;
      --text-secondary: #4A4A4A;
      --text-muted: #9A8469;
      --border-light: #E8E5E0;
    }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      max-width: 720px;
      margin: 0 auto;
      padding: 60px 24px;
      line-height: 1.6;
    }
    .header {
      text-align: left;
      margin-bottom: 48px;
    }
    .eyebrow {
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 500;
      margin: 16px 0;
    }
    .score-section {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: 12px;
      padding: 40px;
      text-align: left;
      margin-bottom: 32px;
    }
    .score-value {
      font-family: 'Playfair Display', serif;
      font-size: 64px;
      color: var(--accent-gold);
    }
    .pillar-result {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid var(--border-light);
    }
    .rec-item {
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: 8px;
      padding: 20px;
      margin: 12px 0;
    }
    code {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 12px;
      background: var(--bg-primary);
      padding: 8px 12px;
      border-radius: 4px;
      display: block;
      margin-top: 8px;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid var(--border-light);
      font-size: 13px;
      color: var(--text-muted);
      text-align: left;
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="eyebrow">Risk Management Framework</span>
    <h1>AI Governance Assessment Report</h1>
    <p>Generated: ${new Date(data.timestamp).toLocaleString()}</p>
  </div>
  
  <div class="score-section">
    <div class="score-value">${data.maturityScore}/100</div>
    <p><strong>Maturity Level:</strong> ${data.maturityLevel}</p>
    <p><strong>Estimated Monthly Cost:</strong> $${data.estimatedMonthlyCost}</p>
  </div>
  
  <h2 style="font-family: 'Playfair Display', serif; font-weight: 500;">Pillar Scores</h2>
  ${Object.entries(data.pillarScores).map(([id, s]) => 
    `<div class="pillar-result"><span>${id}</span><span><strong>${s.score}%</strong></span></div>`
  ).join('')}
  
  <h2 style="font-family: 'Playfair Display', serif; font-weight: 500; margin-top: 32px;">Recommendations</h2>
  ${data.recommendations.map(r => `
    <div class="rec-item">
      <strong style="color: var(--accent-gold);">${r.pillar}</strong><br>
      ${r.question}
    </div>
  `).join('') || '<p style="color: var(--text-muted);">No critical recommendations. Your AI governance posture is strong.</p>'}
  
  <div class="footer">
    WA Lens AI APRA v1.0 | Community-built | Not official AWS product
  </div>
</body>
</html>`;
}

function restartAssessment() {
  currentQuestion = 0;
  Object.keys(answers).forEach(key => delete answers[key]);
  
  document.getElementById('results').style.display = 'none';
  document.getElementById('landing').style.display = 'block';
}

function deployRemediation(command, index) {
  // Extract component from command
  const match = command.match(/--component (\w+)/);
  const component = match ? match[1] : 'all';
  
  // Show deployment status
  alert(`Deploying ${component} remediation component...\n\nIn production, this would deploy the AWS infrastructure automatically.`);
  
  // Here you would trigger the actual deployment
  console.log(`Deploying component: ${component}`);
}

// Add shake animation for invalid input
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`;
document.head.appendChild(style);
