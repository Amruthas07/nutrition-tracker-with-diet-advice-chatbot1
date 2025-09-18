import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Flame, Target, TrendingUp, Utensils, Plus, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in real app, this would come from your backend/state management
const nutritionData = {
  calories: { consumed: 1850, target: 2200, percentage: 84 },
  protein: { consumed: 125, target: 150, percentage: 83 },
  carbs: { consumed: 180, target: 250, percentage: 72 },
  fat: { consumed: 65, target: 80, percentage: 81 },
};

const recentMeals = [
  { id: 1, name: "Greek Yogurt with Berries", calories: 245, time: "8:30 AM" },
  { id: 2, name: "Grilled Chicken Salad", calories: 420, time: "12:45 PM" },
  { id: 3, name: "Almonds & Apple", calories: 185, time: "3:20 PM" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Good morning! 👋</h1>
            <p className="text-muted-foreground">Track your nutrition and reach your health goals</p>
          </div>
          <Button 
            onClick={() => navigate("/food-tracker")} 
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Calories Today"
            value={`${nutritionData.calories.consumed}`}
            subtitle={`of ${nutritionData.calories.target} goal`}
            icon={Flame}
            variant="success"
          />
          <StatsCard
            title="Protein"
            value={`${nutritionData.protein.consumed}g`}
            subtitle={`${nutritionData.protein.percentage}% of goal`}
            icon={Target}
            variant="default"
          />
          <StatsCard
            title="Weekly Progress"
            value="5/7"
            subtitle="days on track"
            icon={TrendingUp}
            variant="accent"
          />
          <StatsCard
            title="Meals Logged"
            value="3"
            subtitle="today"
            icon={Utensils}
            variant="default"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nutrition Progress */}
          <Card className="bg-gradient-card border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Daily Nutrition Goals
              </CardTitle>
              <CardDescription>Your progress toward daily targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(nutritionData).map(([nutrient, data]) => (
                <div key={nutrient} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize font-medium">{nutrient}</span>
                    <span className="text-muted-foreground">
                      {data.consumed}/{data.target} {nutrient === "calories" ? "" : "g"}
                    </span>
                  </div>
                  <Progress 
                    value={data.percentage} 
                    className="h-2 bg-muted"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Meals */}
          <Card className="bg-gradient-card border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                Recent Meals
              </CardTitle>
              <CardDescription>Your latest food entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{meal.name}</p>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">{meal.calories} cal</p>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate("/food-tracker")}
                >
                  View All Meals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to the most common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate("/search")}
              >
                <Apple className="h-6 w-6" />
                Search Foods
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate("/chat")}
              >
                <TrendingUp className="h-6 w-6" />
                Get Diet Advice
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-2"
                onClick={() => navigate("/food-tracker")}
              >
                <Plus className="h-6 w-6" />
                Log Meal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}