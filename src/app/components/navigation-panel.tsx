import { Button } from "@/app/components/ui/button";

type NavButton = {
  label: string;
  onClick: () => void;
  active?: boolean;
};

interface NavigationPanelProps {
  buttons: NavButton[];
}

export function NavigationPanel({ buttons }: NavigationPanelProps) {
  return (
    <div className="w-60 bg-gray-50 border-r border-gray-200 p-4">
      <div className="flex flex-col gap-2">
        {buttons.map((button) => (
          <Button
            key={button.label}
            variant={button.active ? "default" : "ghost"}
            className="justify-start"
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
