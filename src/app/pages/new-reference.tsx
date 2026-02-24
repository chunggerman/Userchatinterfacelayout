import { useState } from "react";
import { NavigationPanel } from "@/app/components/navigation-panel";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface NewReferenceProps {
  onNavigate: (page: string) => void;
  referenceId?: string;
}

interface Document {
  id: string;
  name: string;
  obsolete: boolean;
}

export function NewReference({ onNavigate, referenceId }: NewReferenceProps) {
  const [formData, setFormData] = useState({
    name: referenceId ? "Product Documentation" : "",
    description: referenceId
      ? "Complete product manuals and technical specifications"
      : "",
  });

  const [documents, setDocuments] = useState<Document[]>(
    referenceId
      ? [
          { id: "1", name: "User Manual v2.pdf", obsolete: false },
          { id: "2", name: "API Documentation.pdf", obsolete: false },
          { id: "3", name: "Installation Guide.pdf", obsolete: false },
          { id: "4", name: "User Manual v1.pdf", obsolete: true },
        ]
      : []
  );

  const navButtons = [
    { label: "Reference", onClick: () => onNavigate("reference-list") },
    { label: "Workspace", onClick: () => onNavigate("builder") },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocuments = Array.from(files).map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        obsolete: false,
      }));
      setDocuments([...documents, ...newDocuments]);
      toast.success(`${files.length} file(s) uploaded`);
    }
  };

  const toggleObsolete = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, obsolete: !doc.obsolete } : doc
      )
    );
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleSave = () => {
    toast.success("Reference saved successfully");
    onNavigate("reference-list");
  };

  const handleDiscard = () => {
    onNavigate("reference-list");
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <NavigationPanel buttons={navButtons} />

      {/* Middle Panel */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-8 max-w-3xl">
            <h1 className="text-3xl font-semibold mb-8">
              {referenceId ? "Edit Reference" : "New Reference"}
            </h1>

            <div className="space-y-6">
              <div>
                <Label htmlFor="ref-name">Reference Name</Label>
                <Input
                  id="ref-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter reference name"
                />
              </div>

              <div>
                <Label htmlFor="ref-description">Description</Label>
                <Textarea
                  id="ref-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Document List</Label>
                <div className="mt-2 space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg"
                    >
                      <span className={doc.obsolete ? "line-through text-gray-400" : ""}>
                        {doc.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`obsolete-${doc.id}`} className="text-sm">
                            Obsolete
                          </Label>
                          <Switch
                            id={`obsolete-${doc.id}`}
                            checked={doc.obsolete}
                            onCheckedChange={() => toggleObsolete(doc.id)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDocument(doc.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <p className="text-sm text-gray-500 py-4 text-center">
                      No documents uploaded yet
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Upload Documents</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX, TXT
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleDiscard} variant="outline">
                  Discard
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Blank */}
      <div className="w-70 bg-gray-50 border-l border-gray-200"></div>
    </div>
  );
}