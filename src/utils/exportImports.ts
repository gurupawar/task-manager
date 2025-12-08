import { type Task } from "../types/Task";

export const exportTasksToJSON = (
  tasks: Task[],
  categories: string[]
): void => {
  const exportData = {
    tasks: tasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt).toISOString(),
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null,
    })),
    categories,
    exportedAt: new Date().toISOString(),
    version: "1.0",
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `taskmaster-backup-${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importTasksFromJSON = (
  file: File
): Promise<{ tasks: Task[]; categories: string[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (!data.tasks || !Array.isArray(data.tasks)) {
          throw new Error("Invalid file format: tasks array not found");
        }

        const tasks: Task[] = data.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          categories: task.categories || [],
          order: task.order || 0,
        }));

        const categories: string[] = data.categories || [];

        resolve({ tasks, categories });
      } catch (error) {
        reject(
          new Error("Failed to parse JSON file. Please check the file format.")
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

export const exportTasksToCSV = (tasks: Task[]): void => {
  const headers = [
    "Title",
    "Description",
    "Status",
    "Created",
    "Due Date",
    "Categories",
  ];
  const rows = tasks.map((task) => [
    task.title,
    task.description,
    task.completed ? "Completed" : "Active",
    new Date(task.createdAt).toLocaleDateString(),
    task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date",
    (task.categories || []).join("; "),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `taskmaster-export-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
