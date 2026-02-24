import { useState } from "react";
import { UserChat } from "@/app/pages/user-chat";
import { BuilderWorkspace } from "@/app/pages/builder-workspace";
import { NewAssistant } from "@/app/pages/new-assistant";
import { Certification } from "@/app/pages/certification";
import { ReferenceList } from "@/app/pages/reference-list";
import { NewReference } from "@/app/pages/new-reference";
import { Toaster } from "@/app/components/ui/sonner";

import { EndUserInterface } from "@/app/pages/end-user-interface";

import { Teammate } from "@/app/pages/teammate";

type Page =
  | "user-chat"
  | "builder"
  | "new-assistant"
  | "certification"
  | "reference-list"
  | "new-reference"
  | "end-user"
  | "teammate";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("builder");
  const [currentId, setCurrentId] = useState<string | undefined>();

  const navigate = (page: Page, id?: string) => {
    setCurrentPage(page);
    setCurrentId(id);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "user-chat":
        return <UserChat onNavigate={navigate} />;
      case "end-user":
        return <EndUserInterface onNavigate={navigate} />;
      case "teammate":
        return <Teammate onNavigate={navigate} />;
      case "builder":
        return <BuilderWorkspace onNavigate={navigate} />;
      case "new-assistant":
        return <NewAssistant onNavigate={navigate} />;
      case "certification":
        return <Certification onNavigate={navigate} assistantId={currentId} />;
      case "reference-list":
        return <ReferenceList onNavigate={navigate} />;
      case "new-reference":
        return <NewReference onNavigate={navigate} referenceId={currentId} />;
      default:
        return <BuilderWorkspace onNavigate={navigate} />;
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden bg-white">{renderPage()}</div>
      <Toaster />
    </>
  );
}