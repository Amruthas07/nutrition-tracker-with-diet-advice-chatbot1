import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi! I'm your nutrition coach. I can help you with diet advice, meal planning, and answering nutrition questions. What would you like to know?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const botResponses = [
  "That's a great question! For optimal protein intake, aim for 0.8-1g per kg of body weight for general health, or 1.2-2g per kg if you're active or building muscle.",
  "Meal prep is key to success! Try preparing proteins in bulk, pre-cutting vegetables, and having healthy snacks ready. What specific meals are you struggling with?",
  "For weight loss, focus on creating a moderate calorie deficit while eating nutrient-dense foods. Include plenty of vegetables, lean proteins, and whole grains.",
  "Staying hydrated is crucial! Aim for 8-10 glasses of water daily, more if you're active. You can also get hydration from fruits and vegetables.",
  "Complex carbs like oats, quinoa, and sweet potatoes provide sustained energy. Simple carbs are best around workouts for quick fuel.",
  "Healthy fats are essential! Include sources like avocados, nuts, olive oil, and fatty fish. They help with nutrient absorption and hormone production.",
];

export default function DietChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "How much protein should I eat daily?",
    "What are good meal prep ideas?",
    "Help me lose weight healthily",
    "Best foods for energy?",
  ];

  const askQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Diet Coach</h1>
          <p className="text-muted-foreground">Get personalized nutrition advice and diet recommendations</p>
        </div>

        {/* Quick Questions */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
            <CardDescription>Tap any question to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 whitespace-normal"
                  onClick={() => askQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Container */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Chat with NutriCoach
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 bg-gradient-primary">
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[70%] p-3 rounded-lg",
                      message.sender === "user"
                        ? "bg-gradient-primary text-primary-foreground ml-auto"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      "text-xs mt-1 opacity-70",
                      message.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 bg-gradient-accent">
                      <AvatarFallback>
                        <User className="h-4 w-4 text-accent-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <Avatar className="h-8 w-8 bg-gradient-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about nutrition, diet plans, or healthy recipes..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips for Better Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Ask specific questions about your diet goals</li>
              <li>• Mention your dietary restrictions or preferences</li>
              <li>• Ask for meal suggestions or recipe ideas</li>
              <li>• Get advice on portion sizes and timing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}