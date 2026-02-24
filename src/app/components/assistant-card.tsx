import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface AssistantCardProps {
  name: string;
  status: "learning" | "certified";
  description: string;
  onClick?: () => void;
}

export function AssistantCard({ name, status, description, onClick }: AssistantCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={status === "certified" ? "default" : "secondary"}>
            {status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
