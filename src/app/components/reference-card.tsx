import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { FileText } from "lucide-react";

interface ReferenceCardProps {
  title: string;
  description: string;
  documentCount: number;
  onClick?: () => void;
}

export function ReferenceCard({ title, description, documentCount, onClick }: ReferenceCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{documentCount} documents</p>
      </CardContent>
    </Card>
  );
}
