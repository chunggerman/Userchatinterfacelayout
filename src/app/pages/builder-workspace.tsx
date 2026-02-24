import { NavigationPanel } from "@/app/components/navigation-panel";
import { AssistantCard } from "@/app/components/assistant-card";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface BuilderWorkspaceProps {
  onNavigate: (page: string, assistantId?: string) => void;
}

export function BuilderWorkspace({ onNavigate }: BuilderWorkspaceProps) {
  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Workspace", onClick: () => onNavigate("builder"), active: true },
    { label: "End User View", onClick: () => onNavigate("end-user") },
  ];

  const learningAssistants = [
    {
      id: "1",
      name: "Research Assistant",
      status: "learning" as const,
      description: "Helps with academic research and literature review",
    },
    {
      id: "2",
      name: "Code Helper",
      status: "learning" as const,
      description: "Assists with programming questions and debugging",
    },
    {
      id: "3",
      name: "Writing Coach",
      status: "learning" as const,
      description: "Provides feedback on writing and grammar",
    },
  ];

  const certifiedAssistants = [
    {
      id: "4",
      name: "Customer Support",
      status: "certified" as const,
      description: "Handles customer inquiries and support tickets",
    },
    {
      id: "5",
      name: "Data Analyst",
      status: "certified" as const,
      description: "Analyzes data and generates insights",
    },
    {
      id: "6",
      name: "Content Creator",
      status: "certified" as const,
      description: "Creates engaging content for various platforms",
    },
    {
      id: "7",
      name: "Sales Assistant",
      status: "certified" as const,
      description: "Helps with sales processes and customer engagement",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <NavigationPanel buttons={navButtons} />

      {/* Middle Panel */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8">
            {/* Learning Assistants Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Learning Assistants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {learningAssistants.map((assistant) => (
                  <AssistantCard
                    key={assistant.id}
                    name={assistant.name}
                    status={assistant.status}
                    description={assistant.description}
                    onClick={() => onNavigate("certification", assistant.id)}
                  />
                ))}
              </div>
            </div>

            {/* Certified Assistants Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Certified Assistants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {certifiedAssistants.map((assistant) => (
                  <AssistantCard
                    key={assistant.id}
                    name={assistant.name}
                    status={assistant.status}
                    description={assistant.description}
                    onClick={() => onNavigate("certification", assistant.id)}
                  />
                ))}
              </div>
            </div>

            {/* New Assistant Button */}
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate("new-assistant")}>
                New Assistant
              </Button>
              <Button size="lg" variant="secondary" onClick={() => onNavigate("teammate")}>
                New Teammate
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}