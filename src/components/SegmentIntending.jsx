import React, { useState } from 'react';
import { Clock, Edit2, Save, Plus, X, Moon, Sun, Coffee, Car, Phone, Utensils, ChevronDown } from 'lucide-react';

const SEGMENT_ICONS = {
  'Evening Sleep Preparation': Moon,
  'Morning in Bed': Sun,
  'Morning Preparation': Coffee,
  'Breakfast': Utensils,
  'Driving': Car,
  'Phone Communication': Phone
};

const DEFAULT_SEGMENTS = [
  {
    id: 1,
    name: 'Morning in Bed',
    time: '06:00',
    intention: 'While I am lying here in my bed, I am intending to have a clear picture of this day. I am intending to become exhilerated and excited about this day',
    visualizations: [
      'Clear vision of the day ahead',
      'Feeling of exhilaration',
      'Excitement for the day'
    ]
  },
  {
    id: 2,
    name: 'Morning Preparation',
    time: '06:30',
    intention: 'I intend to acknowledge my wonderful body and to feel appreciation for the magnificent way it functions. I intend to be efficient in my grooming and to bring myself to looking my best.',
    visualizations: [
      'Appreciation for bodily functions',
      'Efficient grooming process',
      'Looking my best'
    ]
  },
  {
    id: 3,
    name: 'Breakfast',
    time: '07:00',
    intention: 'I will select and prepare this wonderful nutritious food efficiently. I will relax and eat it in joy allowing my wonderful body to digest and process it perfectly. I will choose the food that is best for my physical body at this point in time. I will be replenished and refreshed by this food.',
    visualizations: [
      'Efficient food preparation',
      'Joyful eating experience',
      'Perfect digestion and processing'
    ]
  },
  {
    id: 4,
    name: 'Driving',
    time: '08:00',
    intention: 'In this driving segment, I intend to move safely and effectively to my destination. I am aware of other drivers and we co-create a harmonious flow.',
    visualizations: [
      'Safe and effective movement',
      'Harmonious flow with other drivers',
      'Awareness of surroundings'
    ]
  },
  {
    id: 5,
    name: 'Phone Communication',
    time: '09:00',
    intention: 'What is it that I most want to achieve in this conversation? I want to uplift the other person. I want to be understood. I want the other person to understand me and I want the other to be positively influenced in the direction of my desire. I want the other to be stimulated and excited by my words. Indeed, I want this to be a successful conversation.',
    visualizations: [
      'Uplifting communication',
      'Clear mutual understanding',
      'Positive influence and excitement'
    ]
  },
  {
    id: 6,
    name: 'Evening Sleep Preparation',
    time: '22:00',
    intention: 'It is my intention for my body to completely relax. It is my intention to awaken rested, refreshed and eager to begin my day.',
    visualizations: [
      'Complete bodily relaxation',
      'Peaceful transition to sleep',
      'Anticipation of refreshed awakening'
    ]
  }
];

function SegmentCard({ segment, isEditing, setEditingId, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const SegmentIcon = SEGMENT_ICONS[segment.name] || Clock;

  return (
    <div className="mb-4 overflow-hidden">
      <div 
        className={`bg-gradient-to-br from-[#1b1617] to-[#141314] rounded-lg shadow-lg border border-gray-700 
          transition-all duration-500 ease-in-out ${isExpanded ? 'ring-2 ring-blue-400' : 'hover:ring-2 hover:ring-blue-400/50'}`}
      >
        <div 
          className="p-6 cursor-pointer"
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg shadow-lg transition-all duration-300
                              ${isExpanded ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-[#5d1d2d] to-[#2d1d2d]'}`}>
                <SegmentIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                  {segment.name}
                </h3>
                <div className="flex items-center text-gray-400 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {segment.time}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(segment.id);
                    }}
                    className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(segment.id);
                    }}
                    className="p-2 text-pink-400 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            {isEditing ? (
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  value={segment.name}
                  onChange={(e) => onUpdate({...segment, name: e.target.value})}
                  className="w-full p-3 border rounded bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Segment Name"
                />
                <input
                  type="time"
                  value={segment.time}
                  onChange={(e) => onUpdate({...segment, time: e.target.value})}
                  className="w-full p-3 border rounded bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <textarea
                  value={segment.intention}
                  onChange={(e) => onUpdate({...segment, intention: e.target.value})}
                  className="w-full p-3 border rounded h-32 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Set your intention..."
                />
                <button
                  onClick={() => setEditingId(null)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                >
                  <Save className="inline-block w-4 h-4 mr-2" />
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#1b1617]/50 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-lg mb-3">
                    Intention
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{segment.intention}</p>
                </div>
                <div className="bg-[#1b1617]/50 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-lg mb-3">
                    Visualizations
                  </h4>
                  <ul className="space-y-3">
                    {segment.visualizations.map((viz, idx) => (
                      <li key={idx} className="text-gray-300 flex items-start">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3" />
                        {viz}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentIntending() {
  const [segments, setSegments] = useState(DEFAULT_SEGMENTS);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="space-y-6 mb-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
          <div className="relative">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 pb-1">
              Segment Intending
            </h1>
            <p className="text-gray-300 mt-4 text-lg font-light">Set clear intentions for different parts of your day.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 backdrop-blur-3xl"></div>
          <div className="relative prose prose-invert max-w-none">
            <p className="text-pink-100/90 leading-relaxed text-lg">
              Segment Intending is about identifying what you want in THIS moment to gain clarity and remove confusion. The practice centers on setting forth your intention BEFORE entering each segment of your day, emphasizing the power of pre-paving your future experiences. By taking a moment to identify what you want MOST in any given segment, you tap into your emotional guidance system and shift from default creation to deliberate intention.
            </p>
            <p className="text-pink-100/90 leading-relaxed mt-4 text-lg">
              As receptive beings, your thought processes are very fast, and as you are considering only one subject, you have the ability by the power of the Law of Attraction to bring forth more and more clarity upon that subject until you can literally accomplish anything regarding it.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {segments.map((segment, index) => (
          <SegmentCard
            key={segment.id}
            segment={segment}
            isEditing={editingId === segment.id}
            setEditingId={setEditingId}
            onUpdate={(updated) => {
              setSegments(segments.map(s => s.id === updated.id ? updated : s));
            }}
            onDelete={(id) => {
              setSegments(segments.filter(s => s.id !== id));
            }}
          />
        ))}
      </div>

      <button
        onClick={() => {
          const newId = Math.max(...segments.map(s => s.id)) + 1;
          const newSegment = {
            id: newId,
            name: '',
            time: '',
            intention: '',
            visualizations: ['']
          };
          setSegments([...segments, newSegment]);
          setEditingId(newId);
        }}
        className="w-full mt-6 p-6 border-2 border-dashed border-gray-700 rounded-lg
                   text-gray-400 hover:border-blue-500 hover:text-blue-400
                   flex items-center justify-center gap-2 transition-all
                   bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-lg
                   group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
        <div className="relative flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Add New Segment
        </div>
      </button>
    </div>
  );
}

export default SegmentIntending;