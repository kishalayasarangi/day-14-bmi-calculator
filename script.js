let unit = 'metric';
let gender = 'male';

function switchUnit(u) {
  unit = u;
  document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`btn-${u}`).classList.add('active');

  if (u === 'metric') {
    document.getElementById('heightUnit').textContent = 'cm';
    document.getElementById('weightUnit').textContent = 'kg';
    document.getElementById('height').placeholder = 'e.g. 175';
    document.getElementById('weight').placeholder = 'e.g. 70';
  } else {
    document.getElementById('heightUnit').textContent = 'in';
    document.getElementById('weightUnit').textContent = 'lb';
    document.getElementById('height').placeholder = 'e.g. 69';
    document.getElementById('weight').placeholder = 'e.g. 154';
  }

  document.getElementById('height').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('resultCard').classList.add('hidden');
}

function selectGender(g) {
  gender = g;
  document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`btn-${g}`).classList.add('active');
}

function calculateBMI() {
  const age = parseInt(document.getElementById('age').value);
  let height = parseFloat(document.getElementById('height').value);
  let weight = parseFloat(document.getElementById('weight').value);

  if (!age || !height || !weight) {
    alert('Please fill in all fields!');
    return;
  }

  if (unit === 'imperial') {
    height = height * 2.54;
    weight = weight * 0.453592;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  showResult(rounded, weight, heightM, age);
}

function showResult(bmi, weightKg, heightM, age) {
  document.getElementById('resultCard').classList.remove('hidden');
  document.getElementById('bmiValue').textContent = bmi;

  let label, color, tips;

  if (bmi < 18.5) {
    label = 'Underweight';
    color = '#3b82f6';
    tips = '💡 You are underweight. Consider increasing your calorie intake with nutrient-rich foods. Consult a nutritionist for a personalized diet plan.';
  } else if (bmi < 25) {
    label = 'Normal Weight';
    color = '#10b981';
    tips = '✅ Great! You have a healthy BMI. Maintain your weight through regular exercise and a balanced diet. Keep up the good work!';
  } else if (bmi < 30) {
    label = 'Overweight';
    color = '#f59e0b';
    tips = '⚠️ You are slightly overweight. Consider adding 30 minutes of daily exercise and reducing processed foods. Small changes make a big difference!';
  } else {
    label = 'Obese';
    color = '#ef4444';
    tips = '🚨 Your BMI indicates obesity. Please consult a doctor or dietitian for a safe weight loss plan. Focus on gradual, sustainable changes.';
  }

  document.getElementById('bmiLabel').textContent = label;
  document.getElementById('bmiLabel').style.color = color;
  document.getElementById('bmiValue').style.color = color;
  document.getElementById('healthTips').textContent = tips;

  const markerPct = Math.min(Math.max((bmi - 10) / 30 * 100, 2), 98);
  document.getElementById('bmiMarker').style.left = `${markerPct}%`;

  const idealMin = Math.round(18.5 * heightM * heightM * 10) / 10;
  const idealMax = Math.round(24.9 * heightM * heightM * 10) / 10;
  const weightToLose = weightKg > idealMax ? Math.round((weightKg - idealMax) * 10) / 10 : 0;
  const weightToGain = weightKg < idealMin ? Math.round((idealMin - weightKg) * 10) / 10 : 0;

  document.getElementById('extraStats').innerHTML = `
    <div class="extra-stat">
      <span>${idealMin} – ${idealMax} kg</span>
      <label>Ideal Weight Range</label>
    </div>
    <div class="extra-stat">
      <span>${weightToLose > 0 ? `-${weightToLose} kg` : weightToGain > 0 ? `+${weightToGain} kg` : 'On track!'}</span>
      <label>To reach ideal weight</label>
    </div>
    <div class="extra-stat">
      <span>${Math.round(heightM * 100)} cm</span>
      <label>Height</label>
    </div>
    <div class="extra-stat">
      <span>${Math.round(weightKg)} kg</span>
      <label>Weight</label>
    </div>
  `;
}

window.onload = () => {};