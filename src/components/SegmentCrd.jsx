import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Clock, Edit2, Save, Plus, X } from 'lucide-react';

export function SegmentCard({ segment, onSave, onDelete, isEditing, onEdit }) {
  const [editedSegment, setEditedSegment] = useState(segment);

  const handleSave = () => {
    onSave(editedSegment);
  };

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4">
            <input
              type="text"
              value={editedSegment.name}
              onChange={e => setEditedSegment({...editedSegment, name: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Segment Name"
            />
            <input
              type="time"
              value={editedSegment.time}
              onChange={e => setEditedSegment({...editedSegment, time: e.target.value})}
              className="w-full p-2 border rounded"
            />
            <textarea
              value={editedSegment.intention}
              onChange={e => setEditedSegment({...editedSegment, intention: e.target.value})}
              className="w-full p-2 border rounded h-24"
              placeholder="Set your intention..."
            />
            <div className="space-y-2">
              {editedSegment.visualizations.map((viz, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={viz}
                    onChange={e => {
                      const newViz = [...editedSegment.visualizations];
                      newViz[idx] = e.target.value;
                      setEditedSegment({...editedSegment, visualizations: newViz});
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Visualization"
                  />
                  <Button
                    onClick={() => {
                      const newViz = editedSegment.visualizations.filter((_, i) => i !== idx);
                      setEditedSegment({...editedSegment, visualizations: newViz});
                    }}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => setEditedSegment({
                  ...editedSegment,
                  visualizations: [...editedSegment.visualizations, '']
                })}
                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                <Plus size={16} /> Add Visualization
              </Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => onEdit(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <Save size={16} /> Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{segment.name}</h3>
            <div className="flex items-center text-gray-500 mt-1">
              <Clock size={16} className="mr-1" />
              {segment.time}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onEdit(segment.id)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              onClick={() => onDelete(segment.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Intention</h4>
            <p className="text-gray-600">{segment.intention}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Visualizations</h4>
            <ul className="list-disc pl-5 space-y-2">
              {segment.visualizations.map((viz, idx) => (
                <li key={idx} className="text-gray-600">{viz}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}