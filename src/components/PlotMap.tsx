"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ZoomIn, ZoomOut, Edit3, Save, Download, Upload, Trash, Trees, Plus, X, Road, MousePointerSquareDashed } from 'lucide-react';
import initialGridData from '../data/layoutMatrix.json';

export type MapItem = {
  id: string;
  type: 'plot' | 'road' | 'park' | 'empty';
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  label?: string;
};

export default function PlotMap({ onSelectPlot, onDataChange }: { 
  onSelectPlot: (plotId: string, sqft: number) => void,
  onDataChange?: (data: MapItem[]) => void
}) {
  const [mapScale, setMapScale] = useState(0.5);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  
  // Panning State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Touch State
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [gridSize, setGridSize] = useState({ x: 40, y: 80 });
  
  // Editor State
  const [items, setItems] = useState<MapItem[]>(initialGridData as MapItem[]);
  const [editMode, setEditMode] = useState(false);
  
  // Multi-select State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [bulkConfig, setBulkConfig] = useState({
    prefix: '',
    startNumber: 101,
    type: 'plot',
    w: 1,
    h: 1,
    color: ''
  });

  const [hoveredItem, setHoveredItem] = useState<MapItem | null>(null);

  const getRoadInfo = (item: MapItem) => {
    if (item.type !== 'road') return null;
    const isMainRoad = item.h >= 12 || item.w >= 2; 
    return {
      name: item.label || (isMainRoad ? "MAIN STREET" : "INTERNAL ROAD"),
      size: isMainRoad ? "40'-0\" WIDE ROAD" : "25'-0\" WIDE ROAD"
    };
  };

  // Sync state changes up to parent
  useEffect(() => {
    if (onDataChange) onDataChange(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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
      setSelectedIds(prev => {
        if (prev.includes(item.id)) {
          return prev.filter(id => id !== item.id);
        } else {
          return [...prev, item.id];
        }
      });
    } else {
      if (item.type === 'plot') {
        setSelectedPlot(item.id);
        onSelectPlot(item.id, getSqft(item.id));
      }
    }
  };

  const handleEmptyClick = (x: number, y: number) => {
    if (editMode) {
      const newId = `new-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const newItem: MapItem = {
        id: newId,
        type: 'plot',
        x, y, w: 1, h: 1,
        color: '',
        label: ''
      };
      setItems(prev => [...prev, newItem]);
      setSelectedIds(prev => [...prev, newId]);
    }
  };

  const openEditor = () => {
    if (selectedIds.length === 1) {
      const item = items.find(i => i.id === selectedIds[0]);
      if (item) {
        setBulkConfig({
          prefix: item.id,
          startNumber: 101,
          type: item.type,
          w: item.w,
          h: item.h,
          color: item.color || ''
        });
      }
    } else if (selectedIds.length > 1) {
      const firstItem = items.find(i => i.id === selectedIds[0]);
      setBulkConfig({
        prefix: 'A-',
        startNumber: 101,
        type: firstItem?.type || 'plot',
        w: firstItem?.w || 1,
        h: firstItem?.h || 1,
        color: firstItem?.color || ''
      });
    }
    setShowEditor(true);
  };

  const saveEditedItems = () => {
    if (selectedIds.length === 0) return;

    if (selectedIds.length === 1 && !bulkConfig.prefix.trim()) {
      alert("Error: ID cannot be empty.");
      return;
    }

    setItems(prev => {
      let newItems = [...prev];
      
      // Handle conflicts: If an existing item (not in selection) has an ID we're about to use, rename it.
      selectedIds.forEach((_, index) => {
        const targetId = selectedIds.length === 1 
          ? bulkConfig.prefix.trim() 
          : `${bulkConfig.prefix}${bulkConfig.startNumber + index}`;
          
        newItems = newItems.map(item => {
          if (!selectedIds.includes(item.id) && item.id === targetId) {
            return { ...item, id: `${item.id}-old-${Math.floor(Math.random() * 1000)}` };
          }
          return item;
        });
      });

      // Apply changes to selected items
      selectedIds.forEach((id, index) => {
        const idx = newItems.findIndex(i => i.id === id);
        if (idx !== -1) {
          const item = { ...newItems[idx] };
          item.type = bulkConfig.type as any;
          item.w = bulkConfig.w;
          item.h = bulkConfig.h;
          
          if (item.type === 'plot') {
            item.color = bulkConfig.color;
          } else {
            item.color = '';
          }

          if (selectedIds.length === 1) {
            item.id = bulkConfig.prefix.trim();
          } else {
            item.id = `${bulkConfig.prefix}${bulkConfig.startNumber + index}`;
          }
          
          item.label = item.id.includes('-') ? item.id.split('-')[1] : item.id;
          
          newItems[idx] = item;
        }
      });
      return newItems;
    });

    setSelectedIds([]);
    setShowEditor(false);
  };

  const deleteSelectedItems = () => {
    setItems(prev => prev.filter(i => !selectedIds.includes(i.id)));
    setSelectedIds([]);
    setShowEditor(false);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(jsonStr);
    alert("Map JSON copied to clipboard! You can paste it into layoutMatrix.json");
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) {
        alert("Error: Imported data must be an array of map items.");
        return;
      }
      setItems(parsed as MapItem[]);
      setImportText('');
      setShowImportModal(false);
      alert("Map data imported successfully!");
    } catch (e) {
      alert("Error: Invalid JSON format.");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragDistance(0);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const moved = Math.abs(e.movementX) + Math.abs(e.movementY);
    setDragDistance(prev => prev + moved);
    setPan(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY }));
  };
  
  const handleMouseUp = () => {
    setTimeout(() => setIsDragging(false), 50); // Small delay to ensure click handlers see the state
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragDistance(0);
      setLastTouch({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    const moved = Math.abs(currentX - lastTouch.x) + Math.abs(currentY - lastTouch.y);
    setDragDistance(prev => prev + moved);
    
    setPan(prev => ({ 
      x: prev.x + (currentX - lastTouch.x), 
      y: prev.y + (currentY - lastTouch.y) 
    }));
    setLastTouch({ x: currentX, y: currentY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const backgroundCells = useMemo(() => {
    const cells = [];
    for(let y = 0; y < gridSize.y; y++) {
      for(let x = 0; x < gridSize.x; x++) {
        cells.push({ x, y });
      }
    }
    return cells;
  }, [gridSize]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white p-2 md:p-6 rounded-[2rem] shadow-2xl border border-neutral-200">
      
      {/* Sidebar Controls - Order 2 on mobile, Order 1 on desktop */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6 p-4 md:p-8 bg-neutral-50 rounded-3xl border border-neutral-100 relative z-10 shadow-sm order-2 lg:order-1">
        
        {/* Editor Controls */}
        <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <h3 className="font-bold text-sm text-blue-800 tracking-wider mb-3 uppercase flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Map Builder
          </h3>
          <button 
            onClick={() => {
              setEditMode(!editMode);
              if (!editMode === false) {
                setSelectedIds([]);
                setShowEditor(false);
              }
            }}
            className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              editMode ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
          </button>
          
          {editMode && (
            <>
              {selectedIds.length > 0 && (
                <button 
                  onClick={openEditor}
                  className="w-full mt-3 py-3 rounded-lg font-bold text-sm bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md animate-in fade-in"
                >
                  <MousePointerSquareDashed className="w-4 h-4" /> Edit {selectedIds.length} Selected
                </button>
              )}
              
              <button 
                onClick={exportJSON}
                className="w-full mt-3 py-3 rounded-lg font-bold text-sm bg-neutral-800 text-white flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Export Map JSON
              </button>

              <button 
                onClick={() => setShowImportModal(true)}
                className="w-full mt-3 py-3 rounded-lg font-bold text-sm bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-all shadow-sm"
              >
                <Upload className="w-4 h-4" /> Import Map JSON
              </button>
              
              <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Grid Size</h4>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-neutral-500 font-bold block mb-1">Width (X)</label>
                    <input 
                      type="number" 
                      value={gridSize.x} 
                      onChange={e => setGridSize(prev => ({ ...prev, x: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-neutral-500 font-bold block mb-1">Height (Y)</label>
                    <input 
                      type="number" 
                      value={gridSize.y} 
                      onChange={e => setGridSize(prev => ({ ...prev, y: parseInt(e.target.value) || 1 }))}
                      className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-neutral-500 font-medium leading-relaxed bg-neutral-100 p-3 rounded-lg border border-neutral-200">
                <strong>Tip:</strong> Click multiple items to select them sequentially. Clicking empty spaces creates new plots instantly. Click "Edit Selected" to bulk update IDs incrementally (e.g. A-101, A-102).
              </div>
            </>
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

        <div className="h-px bg-neutral-200"></div>

        {/* Plot Legend (SQFt Mapper) */}
        <div>
          <h3 className="font-bold text-[10px] md:text-sm text-neutral-400 tracking-widest mb-4 uppercase">Plot Type & Area</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {[
              { type: 'A', area: '2700 SQ. FT.', dim: "45'-0\" X 60'-0\"", color: 'bg-[#fca5a5] border-rose-300 text-rose-900' },
              { type: 'B', area: '1800 SQ. FT.', dim: "36'-0\" X 50'-0\"", color: 'bg-[#f9a8d4] border-pink-300 text-pink-900' },
              { type: 'C', area: '1200 SQ. FT.', dim: "30'-0\" X 40'-0\"", color: 'bg-[#7dd3fc] border-sky-300 text-sky-900' },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-3 bg-white p-2 md:p-3 rounded-2xl border border-neutral-100 shadow-sm">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center font-black text-lg md:text-xl shrink-0 ${item.color}`}>
                  {item.type}
                </div>
                <div>
                  <div className="text-sm font-black text-neutral-800">{item.area}</div>
                  <div className="text-[10px] font-bold text-neutral-400">{item.dim}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Canvas - Order 1 on mobile, Order 2 on desktop */}
      <div 
        className={`w-full flex-1 bg-[#2c3238] rounded-3xl overflow-hidden relative min-h-[500px] h-[60vh] md:h-[800px] border-[4px] md:border-[8px] border-[#1e2328] shadow-2xl select-none order-1 lg:order-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} touch-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* MAP OVERLAYS (Compass) */}
        <div className="absolute top-6 left-6 z-40 pointer-events-none space-y-4">
          <div className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-sm">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#ccc" strokeWidth="0.5" strokeDasharray="2 2" />
              <text x="50" y="15" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ef4444">N</text>
              <text x="50" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">S</text>
              <text x="94" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">E</text>
              <text x="6" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#666">W</text>
              <path d="M50 20 L58 50 L50 80 L42 50 Z" fill="#ef4444" />
              <path d="M20 50 L50 42 L80 50 L50 58 Z" fill="#333" />
              <circle cx="50" cy="50" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <span className="text-[10px] font-black mt-1 text-neutral-500 tracking-widest">COMPASS</span>
          </div>
        </div>

        {/* ROAD INFO OVERLAY (Top Right) */}
        {hoveredItem && hoveredItem.type === 'road' && (
          <div className="absolute top-6 right-6 z-40 animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border-l-[6px] border-emerald-600 shadow-emerald-900/20 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                <Road className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black text-emerald-600 tracking-widest uppercase mb-1">Road Details</div>
                <div className="text-xl font-black text-neutral-800 leading-none mb-1">
                  {getRoadInfo(hoveredItem)?.name}
                </div>
                <div className="text-xs font-bold text-neutral-500 italic">
                  {getRoadInfo(hoveredItem)?.size}
                </div>
              </div>
            </div>
          </div>
        )}

        <div 
          className="transition-transform duration-75 origin-top-left absolute inset-0"
          style={{ 
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${mapScale})`,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize.x}, 36px)`, 
            gridAutoRows: '20px', 
            gap: '1px',
            backgroundColor: '#1e2328', 
            padding: '2px',
            borderRadius: '4px',
            width: 'max-content'
          }}
        >
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

          {items.map((item) => {
             const isSelected = (!editMode && selectedPlot === item.id) || (editMode && selectedIds.includes(item.id));
             
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

             const selectionIndex = editMode ? selectedIds.indexOf(item.id) : -1;

             return (
                <button
                  key={`${item.id}-${item.x}-${item.y}`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onMouseUp={(e) => {
                    // Only trigger click if the mouse didn't move significantly (drag threshold: 10px)
                    if (dragDistance < 10) {
                      handleItemClick(item);
                    }
                  }}
                  title={item.type === 'road' ? '' : `${item.id} (${item.w}x${item.h})`}
                  style={{ 
                    gridColumn: `${item.x + 1} / span ${item.w}`, 
                    gridRow: `${item.y + 1} / span ${item.h}`,
                    backgroundColor: item.type === 'plot' && item.color ? item.color : undefined,
                    zIndex: isSelected ? 30 : (item.type === 'road' ? 5 : 10)
                  }}
                  className={`flex items-center justify-center text-[8.5px] font-bold transition-all relative overflow-hidden
                    ${bgClass} ${borderClass}
                    ${isSelected ? 'ring-2 ring-yellow-400 brightness-110 scale-[1.15] shadow-xl z-30' : 'hover:brightness-110'}
                    ${item.type === 'road' ? 'hover:scale-[1.01] hover:brightness-125 z-10' : ''}
                    ${editMode ? 'hover:ring-1 hover:ring-white' : ''}
                  `}
                >
                   {typeof content === 'string' ? <span className="whitespace-nowrap px-0.5">{content}</span> : content}
                   
                   {editMode && selectionIndex !== -1 && selectedIds.length > 1 && (
                     <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[6px] font-black w-3 h-3 flex items-center justify-center rounded-bl-sm shadow-sm">
                       {selectionIndex + 1}
                     </div>
                   )}
                </button>
             );
          })}
        </div>
      </div>

      {/* Editor Modal Overlay */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
              <div className="bg-neutral-100 p-4 border-b border-neutral-200 flex items-center justify-between">
                 <h3 className="font-bold text-lg text-neutral-800">
                   {selectedIds.length > 1 ? `Edit ${selectedIds.length} Items` : 'Edit Grid Item'}
                 </h3>
                 <button onClick={() => setShowEditor(false)} className="text-neutral-500 hover:text-black"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-6 space-y-4">
                 
                 {selectedIds.length === 1 ? (
                   <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">ID (Unique)</label>
                      <input type="text" value={bulkConfig.prefix} onChange={e => setBulkConfig({...bulkConfig, prefix: e.target.value})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                   </div>
                 ) : (
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">ID Prefix</label>
                         <input type="text" placeholder="e.g. A-" value={bulkConfig.prefix} onChange={e => setBulkConfig({...bulkConfig, prefix: e.target.value})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Start Number</label>
                         <input type="number" value={bulkConfig.startNumber} onChange={e => setBulkConfig({...bulkConfig, startNumber: parseInt(e.target.value) || 0})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                      </div>
                      <div className="col-span-2 text-xs text-neutral-500 bg-blue-50 p-2 rounded border border-blue-100 text-blue-700">
                         <strong>Preview:</strong> {bulkConfig.prefix}{bulkConfig.startNumber}, {bulkConfig.prefix}{bulkConfig.startNumber + 1}, ...
                      </div>
                   </div>
                 )}

                 <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Type</label>
                    <select value={bulkConfig.type} onChange={e => setBulkConfig({...bulkConfig, type: e.target.value as any})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none">
                       <option value="plot">Plot</option>
                       <option value="road">Road</option>
                       <option value="park">Park</option>
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Width (Cells)</label>
                       <input type="number" min="1" max="40" value={bulkConfig.w} onChange={e => setBulkConfig({...bulkConfig, w: parseInt(e.target.value) || 1})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                   </div>
                   <div>
                       <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Height (Cells)</label>
                       <input type="number" min="1" max="79" value={bulkConfig.h} onChange={e => setBulkConfig({...bulkConfig, h: parseInt(e.target.value) || 1})} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                   </div>
                 </div>
                 {bulkConfig.type === 'plot' && (
                   <>
                     <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Custom Background Color</label>
                        <div className="flex gap-2">
                           <input type="color" value={bulkConfig.color || '#006400'} onChange={e => setBulkConfig({...bulkConfig, color: e.target.value})} className="w-10 h-10 rounded cursor-pointer border border-neutral-200 p-0"/>
                           <input type="text" placeholder="Leave blank for default" value={bulkConfig.color || ''} onChange={e => setBulkConfig({...bulkConfig, color: e.target.value})} className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 outline-none"/>
                        </div>
                     </div>
                   </>
                 )}
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
                 <button onClick={deleteSelectedItems} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"><Trash className="w-4 h-4"/> Delete</button>
                 <button onClick={saveEditedItems} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"><Save className="w-4 h-4"/> Save Items</button>
              </div>
           </div>
        </div>
      )}
      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95">
              <div className="bg-neutral-100 p-4 border-b border-neutral-200 flex items-center justify-between">
                 <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2"><Upload className="w-5 h-5 text-blue-600"/> Import Map Data</h3>
                 <button onClick={() => setShowImportModal(false)} className="text-neutral-500 hover:text-black"><X className="w-5 h-5"/></button>
              </div>
              <div className="p-6 space-y-4">
                 <p className="text-sm text-neutral-500">Paste your <strong>layoutMatrix.json</strong> content below to update the map layout instantly.</p>
                 <textarea 
                   value={importText}
                   onChange={e => setImportText(e.target.value)}
                   placeholder='[ { "id": "A-101", ... }, ... ]'
                   className="w-full h-64 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-xs font-mono focus:ring-2 outline-none resize-none"
                 />
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
                 <button onClick={() => setShowImportModal(false)} className="px-6 py-2 text-neutral-500 hover:text-black text-sm font-bold transition-colors">Cancel</button>
                 <button onClick={handleImport} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-2 text-sm font-bold flex items-center gap-2 transition-all shadow-md"><Save className="w-4 h-4"/> Import Data</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
