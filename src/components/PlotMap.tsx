"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ZoomIn, ZoomOut, Edit3, Save, Download, Trash, Trees, Plus, X } from 'lucide-react';
import initialGridData from '../data/layoutMatrix.json';

type MapItem = {
  id: string;
  type: 'plot' | 'road' | 'park' | 'empty';
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  label?: string;
};

export default function PlotMap({ onSelectPlot }: { onSelectPlot: (plotId: string, sqft: number) => void }) {
  const [mapScale, setMapScale] = useState(1);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  
  // Panning State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Editor State
  const [items, setItems] = useState<MapItem[]>(initialGridData as MapItem[]);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState<MapItem | null>(null);
  const [originalId, setOriginalId] = useState<string | null>(null);

  // Sync state when JSON file changes via hot-reload
  useEffect(() => {
    setItems(initialGridData as MapItem[]);
  }, [initialGridData]);

  const getSqft = (id: string) => {
    if (id.startsWith('A') || id.startsWith('RA')) return 2700;
    if (id.startsWith('B') || id.startsWith('RB')) return 1800;
    if (id.startsWith('C') || id.startsWith('RC')) return 1200;
    return 1000;
  };

  const getPlotColor = (id: string) => {
    if (id.startsWith('A') || id.startsWith('RA')) return 'bg-[#fca5a5] text-rose-900 border-rose-300';
    if (id.startsWith('B') || id.startsWith('RB')) return 'bg-[#f9a8d4] text-pink-900 border-pink-300';
    if (id.startsWith('C') || id.startsWith('RC')) return 'bg-[#7dd3fc] text-sky-900 border-sky-300';
    return 'bg-[#006400] text-white border-[#004000]';
  };

  const handleItemClick = (item: MapItem) => {
    if (editMode) {
      setOriginalId(item.id);
      setEditingItem({...item});
    } else {
      if (item.type === 'plot') {
        setSelectedPlot(item.id);
        onSelectPlot(item.id, getSqft(item.id));
      }
    }
  };

  const handleEmptyClick = (x: number, y: number) => {
    if (editMode) {
      const newId = `new-${Date.now()}`;
      setOriginalId(newId);
      setEditingItem({
        id: newId,
        type: 'plot',
        x, y, w: 1, h: 1,
        color: '',
        label: ''
      });
    }
  };

  const saveEditedItem = () => {
    if (!editingItem) return;

    const cleanId = editingItem.id.trim();
    if (!cleanId) {
      alert("Error: ID cannot be empty.");
      return;
    }

    // Check for duplicates across ALL items (Plots, Parks, Roads)
    const isDuplicate = items.some(i => i.id === cleanId && i.id !== originalId);
    if (isDuplicate) {
      alert(`Error: The ID "${cleanId}" is already being used by another item (Plot, Park, or Road). Every item on the map MUST have a unique ID.`);
      return;
    }

    const finalItem = { ...editingItem, id: cleanId };

    setItems(prev => {
      // If we changed the ID, we need to remove the old one
      let filtered = prev;
      if (originalId && originalId !== cleanId) {
        filtered = prev.filter(i => i.id !== originalId);
      }

      const exists = filtered.find(i => i.id === cleanId);
      if (exists) return filtered.map(i => i.id === cleanId ? finalItem : i);
      return [...filtered, finalItem];
    });
    
    setEditingItem(null);
    setOriginalId(null);
  };

  const deleteEditedItem = () => {
    if (!editingItem) return;
    setItems(prev => prev.filter(i => i.id !== editingItem.id));
    setEditingItem(null);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(jsonStr);
    alert("Map JSON copied to clipboard! You can paste it into layoutMatrix.json");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Generate 40x79 background grid cells to allow clicking empty spaces
  const backgroundCells = useMemo(() => {
    const cells = [];
    for(let y = 0; y < 79; y++) {
      for(let x = 0; x < 40; x++) {
        cells.push({ x, y });
      }
    }
    return cells;
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-3xl shadow-xl border border-neutral-200">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 relative z-10 shadow-sm">
        
        {/* Editor Controls */}
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <h3 className="font-bold text-sm text-blue-800 tracking-wider mb-3 uppercase flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Map Builder
          </h3>
          <button 
            onClick={() => setEditMode(!editMode)}
            className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              editMode ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
          </button>
          
          {editMode && (
            <button 
              onClick={exportJSON}
              className="w-full mt-3 py-3 rounded-lg font-bold text-sm bg-neutral-800 text-white flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Export Map JSON
            </button>
          )}
        </div>

        <div className="h-px bg-neutral-200"></div>

        <div>
            <h3 className="font-bold text-sm text-neutral-500 tracking-wider mb-3 uppercase">Map Controls</h3>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setMapScale(s => Math.min(s + 0.2, 3))} className="flex-1 bg-white border border-neutral-300 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-50 transition shadow-sm font-medium text-sm text-neutral-700"><ZoomIn className="w-4 h-4"/> Zoom In</button>
              <button onClick={() => setMapScale(s => Math.max(s - 0.2, 0.3))} className="flex-1 bg-white border border-neutral-300 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-50 transition shadow-sm font-medium text-sm text-neutral-700"><ZoomOut className="w-4 h-4"/> Zoom Out</button>
            </div>
            <p className="text-xs text-neutral-500 font-medium text-center">
              You can click and drag the map to move around.
            </p>
        </div>
      </div>

      {/* Grid Canvas */}
      <div 
        className={`flex-1 bg-[#2c3238] rounded-2xl overflow-hidden relative h-[800px] border-[6px] border-[#1e2328] shadow-inner select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="transition-transform duration-75 origin-center absolute inset-0"
          style={{ 
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${mapScale})`,
            display: 'grid',
            gridTemplateColumns: `repeat(40, 36px)`, 
            gridAutoRows: '20px', 
            gap: '1px',
            backgroundColor: '#1e2328', 
            padding: '2px',
            borderRadius: '4px',
            width: 'max-content'
          }}
        >
          {/* 1. Render Background Clickable Cells (for adding new items) */}
          {editMode && backgroundCells.map(cell => (
             <div 
               key={`bg-${cell.x}-${cell.y}`}
               onMouseUp={(e) => {
                 if (!isDragging) handleEmptyClick(cell.x, cell.y);
               }}
               className="hover:bg-white/10 cursor-pointer transition-colors"
               style={{ gridColumn: cell.x + 1, gridRow: cell.y + 1 }}
             />
          ))}

          {/* 2. Render Actual Items */}
          {items.map((item) => {
             const isSelected = selectedPlot === item.id || editingItem?.id === item.id;
             
             let bgClass = '';
             let borderClass = 'border-[0.5px] border-black/10 text-white';
             let content: any = item.id;

             if (item.type === 'road') {
                bgClass = 'bg-[#3b424a]';
                borderClass = '';
                content = '';
             } else if (item.type === 'park') {
                bgClass = 'bg-[#4caf50]';
                content = <Trees className="w-5 h-5 text-white/50" />;
             } else {
                bgClass = getPlotColor(item.id);
             }

             return (
                <button
                  key={item.id}
                  onMouseUp={(e) => {
                    // Only trigger click if we aren't dragging significantly
                    if (!isDragging || (Math.abs(e.movementX) < 2 && Math.abs(e.movementY) < 2)) {
                      handleItemClick(item);
                    }
                  }}
                  title={`${item.id} (${item.w}x${item.h})`}
                  style={{ 
                    gridColumn: `${item.x + 1} / span ${item.w}`, 
                    gridRow: `${item.y + 1} / span ${item.h}`,
                    backgroundColor: item.type === 'plot' && item.color ? item.color : undefined,
                    zIndex: isSelected ? 20 : 10
                  }}
                  className={`flex items-center justify-center text-[8.5px] font-bold transition-all hover:brightness-110 
                    ${bgClass} ${borderClass}
                    ${isSelected ? 'ring-2 ring-yellow-400 brightness-110 scale-[1.15] shadow-xl z-30' : ''}
                    ${editMode ? 'hover:ring-1 hover:ring-white' : ''}
                  `}
                >
                   {typeof content === 'string' ? <span className="truncate px-0.5">{content}</span> : content}
                </button>
             );
          })}
        </div>
      </div>

      {/* Editor Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
              <div className="bg-neutral-100 p-4 border-b border-neutral-200 flex items-center justify-between">
                 <h3 className="font-bold text-lg text-neutral-800">Edit Grid Item</h3>
                 <button onClick={() => setEditingItem(null)} className="text-neutral-500 hover:text-black"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">ID (Unique)</label>
                    <input type="text" value={editingItem.id} onChange={e => setEditingItem({...editingItem, id: e.target.value})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Type</label>
                    <select value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value as any})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none">
                       <option value="plot">Plot</option>
                       <option value="road">Road</option>
                       <option value="park">Park</option>
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Width (Cells)</label>
                       <input type="number" min="1" max="40" value={editingItem.w} onChange={e => setEditingItem({...editingItem, w: parseInt(e.target.value) || 1})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                   </div>
                   <div>
                       <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Height (Cells)</label>
                       <input type="number" min="1" max="79" value={editingItem.h} onChange={e => setEditingItem({...editingItem, h: parseInt(e.target.value) || 1})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                   </div>
                 </div>
                 {editingItem.type === 'plot' && (
                   <>
                     <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Custom Background Color (Optional)</label>
                        <div className="flex gap-2">
                           <input type="color" value={editingItem.color || '#006400'} onChange={e => setEditingItem({...editingItem, color: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-neutral-200 p-0"/>
                           <input type="text" placeholder="Leave blank for default" value={editingItem.color || ''} onChange={e => setEditingItem({...editingItem, color: e.target.value})} className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                        </div>
                     </div>
                   </>
                 )}
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
                 <button onClick={deleteEditedItem} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"><Trash className="w-4 h-4"/> Delete</button>
                 <button onClick={saveEditedItem} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"><Save className="w-4 h-4"/> Save Item</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
