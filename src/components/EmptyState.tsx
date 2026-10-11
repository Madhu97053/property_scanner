import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function EmptyState({ title, message, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mt-6 font-display text-lg font-semibold text-gray-700">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-500">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary mt-6 px-5 py-2.5 text-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
