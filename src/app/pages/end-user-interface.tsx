import { useState } from "react";
import { ChatInterface } from "@/app/components/chat-interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Button } from "@/app/components/ui/button";
import { MessageSquare, Clock, Plus, Bot, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

interface EndUserInterfaceProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Assistant {
  id: string;
  name: string;
  description: string;
  role: string;
}

const AVAILABLE_ASSISTANTS: Assistant[] = [
  {
    id: "1",
    name: "Research Assistant",
    description: "Helps with academic research and literature review",
    role: "Research Expert",
  },
  {
    id: "2",
    name: "Data Analyst",
    description: "Analyzes sales data and generates reports",
    role: "Analyst",
  },
  {
    id: "3",
    name: "Customer Support",
    description: "Handles customer inquiries and troubleshooting",
    role: "Support Agent",
  },
  {
    id: "4",
    name: "Content Writer",
    description: "Generates blog posts and marketing copy",
    role: "Writer",
  },
];

export function EndUserInterface({ onNavigate }: EndUserInterfaceProps) {
  const [viewMode, setViewMode] = useState<"selection" | "chat">("selection");
  const [currentAssistant, setCurrentAssistant] = useState<Assistant | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);

  const [history] = useState([
    { id: "1", title: "Research on Quantum Computing", date: "2 mins ago" },
    { id: "2", title: "Literature Review Help", date: "1 hour ago" },
    { id: "3", title: "Data Analysis Methods", date: "Yesterday" },
    { id: "4", title: "Citation Formats", date: "2 days ago" },
  ]);

  const handleNewChat = () => {
    setViewMode("selection");
    setCurrentAssistant(null);
    setMessages([]);
  };

  const handleSelectAssistant = (assistant: Assistant) => {
    setCurrentAssistant(assistant);
    setViewMode("chat");
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Hello! I am your ${assistant.name}. How can I help you today?`,
      },
    ]);
  };

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    
    setMessages((prev) => [...prev, userMsg]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you're asking about \"" + text + "\". Here is some information based on the available data...",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Panel */}
      <div className="w-[240px] border-r flex flex-col bg-gray-50">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-2 p-1 bg-gray-100 border-b">
            <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="flex-1 overflow-hidden m-0">
            <ScrollArea className="h-full">
              <div className="p-3 space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                  >
                    <div className="font-medium text-sm truncate">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
            <div className="p-3 space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => onNavigate("builder")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Builder
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleNewChat}>
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              
              {currentAssistant && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Active Chat</h4>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <div className="font-medium text-sm text-blue-900">{currentAssistant.name}</div>
                    <div className="text-xs text-blue-700 mt-1">{messages.length} messages</div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-gray-50/50">
        {viewMode === "selection" ? (
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Select an Assistant</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {AVAILABLE_ASSISTANTS.map((assistant) => (
                  <Card 
                    key={assistant.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
                    onClick={() => handleSelectAssistant(assistant)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Bot className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{assistant.name}</CardTitle>
                          <CardDescription className="text-xs font-medium text-blue-600 mt-0.5">
                            {assistant.role}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {assistant.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white flex flex-col">
            <div className="border-b px-6 py-3 flex items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{currentAssistant?.name}</h3>
                  <p className="text-xs text-gray-500">{currentAssistant?.role}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface 
                messages={messages} 
                onSendMessage={handleSendMessage} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
