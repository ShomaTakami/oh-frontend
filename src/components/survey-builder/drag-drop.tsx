"use client"

import { createContext, useContext } from 'react';

// Create a mock implementation of react-beautiful-dnd
// In a real app, you would install and use react-beautiful-dnd

const DragDropContext = ({ children, onDragEnd }: { children: React.ReactNode, onDragEnd: (result: any) => void }) => {
  return <div>{children}</div>;
};

const DroppableContext = createContext<any>(null);

const Droppable = ({ 
  children, 
  droppableId 
}: { 
  children: (provided: any) => React.ReactNode, 
  droppableId: string 
}) => {
  const provided = {
    innerRef: (el: HTMLElement | null) => {},
    droppableProps: {
      'data-rbd-droppable-id': droppableId,
      'data-rbd-droppable-context-id': '1',
    },
    placeholder: null,
  };
  
  return (
    <DroppableContext.Provider value={{ droppableId }}>
      {children(provided)}
    </DroppableContext.Provider>
  );
};

const Draggable = ({ 
  children, 
  draggableId, 
  index 
}: { 
  children: (provided: any) => React.ReactNode, 
  draggableId: string, 
  index: number 
}) => {
  const provided = {
    innerRef: (el: HTMLElement | null) => {},
    draggableProps: {
      'data-rbd-draggable-id': draggableId,
      'data-rbd-draggable-context-id': '1',
      style: {
        transform: 'none',
        transition: 'none',
      },
    },
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': draggableId,
      'data-rbd-drag-handle-context-id': '1',
      'aria-describedby': `rbd-announcement-1`,
      role: 'button',
      tabIndex: 0,
      draggable: false,
      onDragStart: (e: React.DragEvent) => e.preventDefault(),
    },
  };
  
  return <>{children(provided)}</>;
};

export { DragDropContext, Droppable, Draggable };