import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFoodContext, FoodEntry } from "@/contexts/FoodContext";

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  serving: string;
}

const mockFoods: FoodItem[] = [
  {
    id: 1,
    name: "Grilled Chicken Breast",
    calories: 231,
    protein: 43.5,
    carbs: 0,
    fat: 5,
    category: "Protein",
    serving: "100g",
  },
  {
    id: 2,
    name: "Brown Rice",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    category: "Grains",
    serving: "100g",
  },
  {
    id: 3,
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    category: "Vegetables",
    serving: "100g",
  },
  {
    id: 4,
    name: "Greek Yogurt",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    category: "Dairy",
    serving: "100g",
  },
  {
    id: 5,
    name: "Banana",
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    category: "Fruits",
    serving: "1 medium",
  },
  {
    id: 6,
    name: "Almonds",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    category: "Nuts",
    serving: "100g",
  },
  {
    id: 7,
    name: "Salmon Fillet",
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 12,
    category: "Protein",
    serving: "100g",
  },
  {
    id: 8,
    name: "Sweet Potato",
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    category: "Vegetables",
    serving: "100g",
  },
];

const categories = ["All", "Protein", "Grains", "Vegetables", "Fruits", "Dairy", "Nuts"];

export default function SearchFoods() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFoods, setFilteredFoods] = useState(mockFoods);
  const { toast } = useToast();
  const { addMeal } = useFoodContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterFoods(value, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterFoods(searchTerm, category);
  };

  const filterFoods = (search: string, category: string) => {
    let filtered = mockFoods;

    if (search) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(food => food.category === category);
    }

    setFilteredFoods(filtered);
  };

  const addToLog = (food: FoodItem) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const foodEntry: FoodEntry = {
      id: Date.now(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      time: timeString,
      meal: "snack", // Default to snack, user can edit later
    };
    
    addMeal(foodEntry);
    
    toast({
      title: "Food Added!",
      description: `${food.name} has been added to your food tracker.`,
    });
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Protein": return "default";
      case "Grains": return "secondary";
      case "Vegetables": return "outline";
      case "Fruits": return "destructive";
      case "Dairy": return "default";
      case "Nuts": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Search Foods</h1>
          <p className="text-muted-foreground">Find nutritional information for thousands of foods</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search & Filter
            </CardTitle>
            <CardDescription>Find the foods you're looking for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for foods..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className={selectedCategory === category ? "bg-gradient-primary" : ""}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <Card key={food.id} className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{food.name}</CardTitle>
                    <CardDescription>Per {food.serving}</CardDescription>
                  </div>
                  <Badge variant={getCategoryBadgeVariant(food.category)}>
                    {food.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Calorie highlight */}
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{food.calories}</p>
                  <p className="text-sm text-muted-foreground">calories</p>
                </div>

                {/* Macronutrients */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-semibold text-success">{food.protein}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-semibold text-warning">{food.carbs}g</p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="font-semibold text-accent">{food.fat}g</p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                </div>

                {/* Add Button */}
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={() => addToLog(food)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Log
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <Card className="bg-gradient-card border-border shadow-soft">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No foods found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}