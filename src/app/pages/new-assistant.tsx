import { useState } from "react";
import { NavigationPanel } from "@/app/components/navigation-panel";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Slider } from "@/app/components/ui/slider";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { toast } from "sonner";

interface NewAssistantProps {
  onNavigate: (page: string) => void;
}

export function NewAssistant({ onNavigate }: NewAssistantProps) {
  const [selectedSource, setSelectedSource] = useState<"reference" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    generalInstruction: "",
    aiRefinedInstruction: "",
    topK: [7],
    messageHistory: [15],
    role: "",
    audience: "",
    style: "",
    tone: "",
  });

  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Workspace", onClick: () => onNavigate("builder") },
  ];

  const handleAIGenerate = () => {
    toast.success("AI instruction generation started");
    // Simulate AI generation
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        aiRefinedInstruction: `You are a ${prev.role || "professional"} assistant designed to help ${
          prev.audience || "users"
        }. Your style is ${prev.style || "professional"} and your tone is ${
          prev.tone || "friendly"
        }. ${prev.generalInstruction}`,
      }));
    }, 1000);
  };

  const handleSave = () => {
    toast.success("Assistant saved successfully");
    onNavigate("builder");
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <NavigationPanel buttons={navButtons} />

      {/* Middle Panel */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8 max-w-3xl">
            <h1 className="text-3xl font-semibold mb-8">New Assistant</h1>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Assistant Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter assistant name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="general-instruction">General Instruction</Label>
                <Textarea
                  id="general-instruction"
                  value={formData.generalInstruction}
                  onChange={(e) =>
                    setFormData({ ...formData, generalInstruction: e.target.value })
                  }
                  placeholder="Enter general instructions"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="ai-refined">AI-Refined Instruction</Label>
                <Textarea
                  id="ai-refined"
                  value={formData.aiRefinedInstruction}
                  onChange={(e) =>
                    setFormData({ ...formData, aiRefinedInstruction: e.target.value })
                  }
                  placeholder="AI-generated instructions will appear here"
                  rows={4}
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>

                <div className="space-y-6">
                  <div>
                    <Label>Top-k: {formData.topK[0]}</Label>
                    <Slider
                      value={formData.topK}
                      onValueChange={(value) => setFormData({ ...formData, topK: value })}
                      min={5}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Message History: {formData.messageHistory[0]}</Label>
                    <Slider
                      value={formData.messageHistory}
                      onValueChange={(value) =>
                        setFormData({ ...formData, messageHistory: value })
                      }
                      min={10}
                      max={20}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g., Expert, Teacher"
                      />
                    </div>

                    <div>
                      <Label htmlFor="audience">Audience</Label>
                      <Input
                        id="audience"
                        value={formData.audience}
                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                        placeholder="e.g., Students, Professionals"
                      />
                    </div>

                    <div>
                      <Label htmlFor="style">Style</Label>
                      <Input
                        id="style"
                        value={formData.style}
                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                        placeholder="e.g., Formal, Casual"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tone">Tone</Label>
                      <Input
                        id="tone"
                        value={formData.tone}
                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                        placeholder="e.g., Friendly, Professional"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleAIGenerate} variant="outline">
                  AI Generate Instruction
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel */}
      <div className="w-70 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Source Selection</h3>
        <div className="space-y-2">
          <Button
            variant={selectedSource === "reference" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setSelectedSource(selectedSource === "reference" ? null : "reference")}
          >
            Reference
          </Button>
        </div>
      </div>
    </div>
  );
}