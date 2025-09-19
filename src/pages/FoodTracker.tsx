import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Clock, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoodEntry {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
}

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

export default function FoodTracker() {
  const [meals, setMeals] = useState<FoodEntry[]>(mockMeals);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodEntry | null>(null);
  const { toast } = useToast();

  const [newFood, setNewFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    meal: "breakfast" as "breakfast" | "lunch" | "dinner" | "snack",
  });

  const handleAddFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "Missing Information",
        description: "Please enter at least food name and calories.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const foodEntry: FoodEntry = {
      id: Date.now(),
      name: newFood.name,
      calories: parseInt(newFood.calories),
      protein: parseInt(newFood.protein) || 0,
      carbs: parseInt(newFood.carbs) || 0,
      fat: parseInt(newFood.fat) || 0,
      time: timeString,
      meal: newFood.meal,
    };

    setMeals([...meals, foodEntry]);
    setNewFood({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      meal: "breakfast",
    });
    setIsAddingFood(false);

    toast({
      title: "Food Added!",
      description: `${foodEntry.name} has been logged successfully.`,
    });
  };

  const handleDeleteFood = (id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
    toast({
      title: "Food Removed",
      description: "The food entry has been deleted.",
    });
  };

  const handleEditFood = (food: FoodEntry) => {
    setEditingFood(food);
    setNewFood({
      name: food.name,
      calories: food.calories.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fat: food.fat.toString(),
      meal: food.meal,
    });
    setIsAddingFood(true);
  };

  const handleUpdateFood = () => {
    if (!newFood.name || !newFood.calories) {
      toast({
        title: "Missing Information",
        description: "Please enter at least food name and calories.",
        variant: "destructive",
      });
      return;
    }

    if (!editingFood) return;

    const updatedFood: FoodEntry = {
      ...editingFood,
      name: newFood.name,
      calories: parseInt(newFood.calories),
      protein: parseInt(newFood.protein) || 0,
      carbs: parseInt(newFood.carbs) || 0,
      fat: parseInt(newFood.fat) || 0,
      meal: newFood.meal,
    };

    setMeals(meals.map(meal => meal.id === editingFood.id ? updatedFood : meal));
    setNewFood({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      meal: "breakfast",
    });
    setEditingFood(null);
    setIsAddingFood(false);

    toast({
      title: "Food Updated!",
      description: `${updatedFood.name} has been updated successfully.`,
    });
  };

  const handleCancelEdit = () => {
    setEditingFood(null);
    setNewFood({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      meal: "breakfast",
    });
    setIsAddingFood(false);
  };

  const getMealsByType = (mealType: string) => {
    return meals.filter(meal => meal.meal === mealType);
  };

  const getMealBadgeVariant = (meal: string) => {
    switch (meal) {
      case "breakfast": return "default";
      case "lunch": return "secondary";
      case "dinner": return "outline";
      case "snack": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Food Tracker</h1>
            <p className="text-muted-foreground">Log your meals and track your nutrition</p>
          </div>
          <Button 
            onClick={() => setIsAddingFood(true)}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Food
          </Button>
        </div>

        {/* Add Food Form */}
        {isAddingFood && (
          <Card className="bg-gradient-card border-border shadow-soft">
            <CardHeader>
              <CardTitle>{editingFood ? "Edit Food" : "Add New Food"}</CardTitle>
              <CardDescription>
                {editingFood ? "Update the details of your food item" : "Enter the details of your food item"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="food-name">Food Name</Label>
                  <Input
                    id="food-name"
                    placeholder="e.g., Grilled Chicken Breast"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <select
                    id="meal-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newFood.meal}
                    onChange={(e) => setNewFood({ ...newFood, meal: e.target.value as any })}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="250"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="25"
                    value={newFood.protein}
                    onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="30"
                    value={newFood.carbs}
                    onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    placeholder="10"
                    value={newFood.fat}
                    onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={editingFood ? handleUpdateFood : handleAddFood} 
                  className="bg-gradient-success"
                >
                  {editingFood ? (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Update Food
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Food
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Food Entries */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Meals</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snack">Snacks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {meals.map((meal) => (
                <Card key={meal.id} className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{meal.name}</h3>
                          <Badge variant={getMealBadgeVariant(meal.meal)}>
                            {meal.meal}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meal.time}
                          </span>
                          <span className="font-semibold text-accent">{meal.calories} cal</span>
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>F: {meal.fat}g</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditFood(meal)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteFood(meal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
            <TabsContent key={mealType} value={mealType} className="space-y-4">
              <div className="grid gap-4">
                {getMealsByType(mealType).map((meal) => (
                  <Card key={meal.id} className="bg-gradient-card border-border shadow-soft">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">{meal.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {meal.time}
                            </span>
                            <span className="font-semibold text-accent">{meal.calories} cal</span>
                            <span>P: {meal.protein}g</span>
                            <span>C: {meal.carbs}g</span>
                            <span>F: {meal.fat}g</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditFood(meal)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteFood(meal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {getMealsByType(mealType).length === 0 && (
                  <Card className="bg-gradient-card border-border shadow-soft">
                    <CardContent className="p-8 text-center">
                      <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No {mealType} logged yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}