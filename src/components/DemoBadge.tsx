import { AlertTriangle } from 'lucide-react';

export default function DemoBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`demo-badge ${className}`}>
      <AlertTriangle className="h-3 w-3" />
      Demo Preview
    </span>
  );
}
