import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export function NewSegmentButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg
                 text-gray-500 hover:border-blue-500 hover:text-blue-500
                 flex items-center justify-center gap-2 transition-colors"
    >
      <Plus size={20} />
      Add New Segment
    </Button>
  );
}