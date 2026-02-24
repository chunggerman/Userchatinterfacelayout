import { NavigationPanel } from "@/app/components/navigation-panel";
import { ReferenceCard } from "@/app/components/reference-card";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface ReferenceListProps {
  onNavigate: (page: string, referenceId?: string) => void;
}

export function ReferenceList({ onNavigate }: ReferenceListProps) {
  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list"), active: true },
    { label: "Workspace", onClick: () => onNavigate("builder") },
  ];

  const references = [
    {
      id: "1",
      title: "Product Documentation",
      description: "Complete product manuals and technical specifications",
      documentCount: 24,
    },
    {
      id: "2",
      title: "Legal Resources",
      description: "Legal documents, policies, and compliance materials",
      documentCount: 18,
    },
    {
      id: "3",
      title: "Training Materials",
      description: "Employee training guides and onboarding documents",
      documentCount: 32,
    },
    {
      id: "4",
      title: "Marketing Content",
      description: "Brand guidelines, messaging, and marketing collateral",
      documentCount: 15,
    },
    {
      id: "5",
      title: "Research Papers",
      description: "Academic research and industry whitepapers",
      documentCount: 45,
    },
    {
      id: "6",
      title: "Customer FAQs",
      description: "Frequently asked questions and support materials",
      documentCount: 28,
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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold">References</h1>
              <Button onClick={() => onNavigate("new-reference")}>New Reference</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {references.map((reference) => (
                <ReferenceCard
                  key={reference.id}
                  title={reference.title}
                  description={reference.description}
                  documentCount={reference.documentCount}
                  onClick={() => onNavigate("new-reference", reference.id)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}