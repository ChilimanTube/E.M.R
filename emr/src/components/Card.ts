// components/Card.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface CardProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;