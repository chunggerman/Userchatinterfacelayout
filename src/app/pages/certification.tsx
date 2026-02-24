import { useState } from "react";
import { NavigationPanel } from "@/app/components/navigation-panel";
import { ChatInterface } from "@/app/components/chat-interface";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Slider } from "@/app/components/ui/slider";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface CertificationProps {
  onNavigate: (page: string) => void;
  assistantId?: string;
}

export function Certification({ onNavigate, assistantId }: CertificationProps) {
  const [formData, setFormData] = useState({
    description: "Helps with academic research and literature review",
    generalInstruction: "Provide detailed and accurate research assistance",
    aiRefinedInstruction: "You are a research assistant...",
    topK: [7],
    messageHistory: [15],
    role: "Research Expert",
    audience: "Students and Researchers",
    style: "Academic",
    tone: "Professional",
  });

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Workspace", onClick: () => onNavigate("builder") },
  ];

  const references = [
    { id: "1", title: "Product Documentation" },
    { id: "2", title: "Legal Resources" },
    { id: "3", title: "Training Materials" },
    { id: "4", title: "Marketing Content" },
    { id: "5", title: "Research Papers" },
    { id: "6", title: "Customer FAQs" },
  ];

  const handleSave = () => {
    toast.success("Changes saved successfully");
  };

  const handleSaveAndClose = () => {
    toast.success("Changes saved successfully");
    onNavigate("builder");
  };

  const handleCertify = () => {
    toast.success("Assistant certified successfully");
    onNavigate("builder");
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <NavigationPanel buttons={navButtons} />

      {/* Middle Panel - Chat */}
      <div className="flex-1">
        <ChatInterface />
      </div>

      {/* Right Panel - Editable Fields */}
      <div className="w-[280px] bg-gray-50 border-l border-gray-200 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            
            {/* Source Selection Section */}
            <div className="border-b pb-4 mb-4 space-y-4">
              <h3 className="font-semibold text-lg">Context Source</h3>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Reference</Label>
                <Select onValueChange={setSelectedItem} value={selectedItem || undefined}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reference" />
                  </SelectTrigger>
                  <SelectContent>
                    {references.map((ref) => (
                      <SelectItem key={ref.id} value={ref.id}>
                        {ref.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <h3 className="font-semibold text-lg">Assistant Configuration</h3>

            <div>
              <Label htmlFor="cert-description">Description</Label>
              <Textarea
                id="cert-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="cert-general">General Instruction</Label>
              <Textarea
                id="cert-general"
                value={formData.generalInstruction}
                onChange={(e) =>
                  setFormData({ ...formData, generalInstruction: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <Label htmlFor="cert-role" className="text-sm">Role</Label>
                <Input
                  id="cert-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-audience" className="text-sm">Audience</Label>
                <Input
                  id="cert-audience"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-style" className="text-sm">Style</Label>
                <Input
                  id="cert-style"
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cert-tone" className="text-sm">Tone</Label>
                <Input
                  id="cert-tone"
                  value={formData.tone}
                  onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cert-ai-refined">AI-Refined Instruction</Label>
              <Textarea
                id="cert-ai-refined"
                value={formData.aiRefinedInstruction}
                onChange={(e) =>
                  setFormData({ ...formData, aiRefinedInstruction: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">General Settings</h4>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Top-k: {formData.topK[0]}</Label>
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
                  <Label className="text-sm">Message History: {formData.messageHistory[0]}</Label>
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
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Button onClick={handleSave} variant="outline" className="w-full">
                Save
              </Button>
              <Button onClick={handleSaveAndClose} variant="outline" className="w-full">
                Save & Close
              </Button>
              <Button onClick={handleCertify} className="w-full">
                Certify
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}