export const initialData = {
    tasks: {
      task1: { id: 'task1', content: 'Task 1' },
      task2: { id: 'task2', content: 'Task 2' },
      task3: { id: 'task3', content: 'Task 3' },
      // Add more tasks as needed
    },
    columns: {
      column1: {
        id: 'column1',
        title: 'To Do',
        taskIds: ['task1', 'task2', 'task3'],
      },
      // other columns
    },
    columnOrder: ['column1', /* other columns */],
  };
  
  type ColumnData = {
    id: string;
    title: string;
    taskIds: string[];
  };
  
  type Columns = {
    [key: string]: ColumnData;
  };