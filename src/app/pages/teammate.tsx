import { useState } from "react";
import { NavigationPanel } from "@/app/components/navigation-panel";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Slider } from "@/app/components/ui/slider";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Checkbox } from "@/app/components/ui/checkbox";
import { toast } from "sonner";
import { Bot, FileText } from "lucide-react";

interface TeammateProps {
  onNavigate: (page: string) => void;
}

interface SelectionItem {
  id: string;
  name: string;
  type: "assistant" | "reference";
}

export function Teammate({ onNavigate }: TeammateProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    generalInstruction: "",
    role: "",
    audience: "",
    style: "",
    tone: "",
  });

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Workspace", onClick: () => onNavigate("builder") },
    { label: "End User View", onClick: () => onNavigate("end-user") },
  ];

  const certifiedAssistants: SelectionItem[] = [
    { id: "a1", name: "Customer Support", type: "assistant" },
    { id: "a2", name: "Data Analyst", type: "assistant" },
    { id: "a3", name: "Content Creator", type: "assistant" },
    { id: "a4", name: "Sales Assistant", type: "assistant" },
  ];

  const references: SelectionItem[] = [
    { id: "r1", name: "Product Docs", type: "reference" },
    { id: "r2", name: "Legal Guidelines", type: "reference" },
    { id: "r3", name: "Brand Book", type: "reference" },
  ];

  const handleToggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    toast.success("Teammate saved successfully");
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
            <h1 className="text-3xl font-semibold mb-8">New Teammate</h1>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Teammate Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter teammate name"
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

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g., Coordinator"
                      />
                    </div>

                    <div>
                      <Label htmlFor="audience">Audience</Label>
                      <Input
                        id="audience"
                        value={formData.audience}
                        onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                        placeholder="e.g., Internal Team"
                      />
                    </div>

                    <div>
                      <Label htmlFor="style">Style</Label>
                      <Input
                        id="style"
                        value={formData.style}
                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                        placeholder="e.g., Collaborative"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tone">Tone</Label>
                      <Input
                        id="tone"
                        value={formData.tone}
                        onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                        placeholder="e.g., Helpful"
                      />
                    </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleSave}>Save Teammate</Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Resource Selection */}
      <div className="w-[300px] bg-gray-50 border-l border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-gray-50/50">
          <h3 className="font-semibold">Team Resources</h3>
          <p className="text-xs text-gray-500 mt-1">Select assistants and references to add to this teammate.</p>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Assistants Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-sm text-gray-900">Certified Assistants</h4>
              </div>
              <div className="space-y-2">
                {certifiedAssistants.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2 p-2 rounded hover:bg-white transition-colors">
                    <Checkbox 
                      id={item.id} 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleToggleItem(item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-orange-600" />
                <h4 className="font-medium text-sm text-gray-900">References</h4>
              </div>
              <div className="space-y-2">
                {references.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2 p-2 rounded hover:bg-white transition-colors">
                    <Checkbox 
                      id={item.id} 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleToggleItem(item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-white">
            <div className="text-xs text-gray-500 mb-2">
                {selectedItems.length} items selected
            </div>
        </div>
      </div>
    </div>
  );
}