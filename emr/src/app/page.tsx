import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { initialData } from './data';
import Column from '../components/Column';

const App: React.FC = () => {
  const initialTasks = initialData.tasks;
  const initialColumns = initialData.columns;
  const initialColumnOrder = initialData.columnOrder;

  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(initialColumnOrder);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      // If the task was not dropped in a valid droppable destination, do nothing
      return;
    }

    const sourceColumn = columns[result.source.droppableId];
    const destinationColumn = columns[result.destination.droppableId];

    if (!sourceColumn || !destinationColumn) {
      return; // Handle this case as needed
    }

    const sourceTaskIds = [...sourceColumn.taskIds];
    const destinationTaskIds = [...destinationColumn.taskIds];

    const [movedTaskId] = sourceTaskIds.splice(result.source.index, 1);
    destinationTaskIds.splice(result.destination.index, 0, movedTaskId);

    const updatedColumns = {
      ...columns,
      [sourceColumn.id]: {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      },
      [destinationColumn.id]: {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      },
    };

    setColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        {columnOrder.map((columnId: string) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map((taskId: string) => tasks[taskId]);

          return (
            <Column key={column.id} column={column} tasks={columnTasks} />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default App;