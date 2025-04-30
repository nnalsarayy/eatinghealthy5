/**
 * Calculates daily calorie and protein needs
 */
export function calculateDailyCalories(params: {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  goal: string;
}): { calories: number; protein: number } {
  // Add safety check for undefined goal
  if (!params.goal) {
    return { calories: 0, protein: 0 };
  }

  // Normalize the Swedish goal text to internal identifier
  let normalizedGoal: 'maintain' | 'gain' | 'lose';
  const g = params.goal.toLowerCase();
  
  if (g.includes('upp')) {
    normalizedGoal = 'gain';
  } else if (g.includes('ner')) {
    normalizedGoal = 'lose';
  } else {
    normalizedGoal = 'maintain';
  }

  // Calculate BMR using Mifflin-St Jeor formula
  const s = (params.gender === "male") ? 5 : -161;
  const bmr = 10 * params.weight + 6.25 * params.height - 5 * params.age + s;

  // Apply activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725
  };
  
  const maintenanceCalories = bmr * activityMultipliers[params.activityLevel];

  // Adjust calories for goal
  let finalCalories = maintenanceCalories;
  if (normalizedGoal === 'gain') {
    finalCalories += 500;
  } else if (normalizedGoal === 'lose') {
    finalCalories -= 500;
  }

  // Calculate protein based on goal
  let proteinMultiplier: number;
  switch (normalizedGoal) {
    case 'maintain':
      proteinMultiplier = 2.0;
      break;
    case 'gain':
      proteinMultiplier = 2.2;
      break;
    case 'lose':
      proteinMultiplier = 1.6;
      break;
  }
  
  const proteinGrams = Math.round(params.weight * proteinMultiplier);
  
  return {
    calories: Math.round(finalCalories),
    protein: proteinGrams
  };
}