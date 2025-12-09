import React, { useRef } from "react";
import { type Task } from "../types/Task";
import {
  exportTasksToJSON,
  exportTasksToCSV,
  importTasksFromJSON,
} from "../utils/exportImports";
import { Button } from "@/components/ui/button";
import { Upload, FileJson, FileSpreadsheet } from "lucide-react";

interface ExportImportProps {
  tasks: Task[];
  categories: string[];
  onImport: (tasks: Task[], categories: string[]) => void;
}

const ExportImport: React.FC<ExportImportProps> = ({
  tasks,
  categories,
  onImport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    if (tasks.length === 0) {
      return;
    }
    exportTasksToJSON(tasks, categories);
  };

  const handleExportCSV = () => {
    if (tasks.length === 0) {
      return;
    }
    exportTasksToCSV(tasks);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { tasks: importedTasks, categories: importedCategories } =
        await importTasksFromJSON(file);

      const confirmMessage = `This will import ${importedTasks.length} tasks and ${importedCategories.length} categories. Your existing data will be replaced. Continue?`;

      if (window.confirm(confirmMessage)) {
        onImport(importedTasks, importedCategories);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Import failed");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleExportJSON}
          variant="outline"
          className="flex-1 sm:flex-initial"
        >
          <FileJson className="mr-2 h-4 w-4" />
          Export JSON
        </Button>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="flex-1 sm:flex-initial"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button
          onClick={handleImportClick}
          variant="outline"
          className="flex-1 sm:flex-initial"
        >
          <Upload className="mr-2 h-4 w-4" />
          Import JSON
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ExportImport;
