import { useState } from "react";
import { NavigationPanel } from "@/app/components/navigation-panel";
import { ChatInterface } from "@/app/components/chat-interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface UserChatProps {
  onNavigate: (page: string) => void;
}

export function UserChat({ onNavigate }: UserChatProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const navButtons = [
    { label: "History", onClick: () => {} },
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Assistant", onClick: () => onNavigate("builder") },
  ];

  return (
    <div className="flex h-screen">
      {/* Left Panel - Navigation */}
      <NavigationPanel buttons={navButtons} />

      {/* Middle Panel - Chat */}
      <div className="flex-1">
        <ChatInterface />
      </div>

      {/* Right Panel - Source Selection */}
      <div className="w-70 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Source Selection</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Reference</label>
            <Select
              onValueChange={(value) => setSelectedSource(value)}
              disabled={selectedSource !== null && selectedSource !== "reference"}
            >
              <SelectTrigger className={selectedSource && selectedSource !== "reference" ? "opacity-50" : ""}>
                <SelectValue placeholder="Select reference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ref1">Reference 1</SelectItem>
                <SelectItem value="ref2">Reference 2</SelectItem>
                <SelectItem value="ref3">Reference 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Assistant</label>
            <Select
              onValueChange={(value) => setSelectedSource(value)}
              disabled={selectedSource !== null && selectedSource !== "assistant"}
            >
              <SelectTrigger className={selectedSource && selectedSource !== "assistant" ? "opacity-50" : ""}>
                <SelectValue placeholder="Select assistant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asst1">Assistant 1</SelectItem>
                <SelectItem value="asst2">Assistant 2</SelectItem>
                <SelectItem value="asst3">Assistant 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}