import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
}

interface FoodContextType {
  meals: FoodEntry[];
  addMeal: (meal: FoodEntry) => void;
  updateMeal: (id: number, meal: FoodEntry) => void;
  deleteMeal: (id: number) => void;
  getNutritionTotals: () => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const mockMeals: FoodEntry[] = [
  {
    id: 1,
    name: "Greek Yogurt with Berries",
    calories: 245,
    protein: 20,
    carbs: 30,
    fat: 5,
    time: "8:30 AM",
    meal: "breakfast",
  },
  {
    id: 2,
    name: "Grilled Chicken Salad",
    calories: 420,
    protein: 45,
    carbs: 15,
    fat: 22,
    time: "12:45 PM",
    meal: "lunch",
  },
  {
    id: 3,
    name: "Almonds & Apple",
    calories: 185,
    protein: 6,
    carbs: 15,
    fat: 14,
    time: "3:20 PM",
    meal: "snack",
  },
];

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<FoodEntry[]>(() => {
    const savedMeals = localStorage.getItem('foodTracker-meals');
    return savedMeals ? JSON.parse(savedMeals) : mockMeals;
  });

  useEffect(() => {
    localStorage.setItem('foodTracker-meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = (meal: FoodEntry) => {
    setMeals(prev => [...prev, meal]);
  };

  const updateMeal = (id: number, updatedMeal: FoodEntry) => {
    setMeals(prev => prev.map(meal => meal.id === id ? updatedMeal : meal));
  };

  const deleteMeal = (id: number) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  const getNutritionTotals = () => {
    return meals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <FoodContext.Provider value={{
      meals,
      addMeal,
      updateMeal,
      deleteMeal,
      getNutritionTotals,
    }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodContext() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
}