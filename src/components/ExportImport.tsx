import React, { useRef } from "react";
import "./ExportImport.css";
import { type Task } from "../types/Task";
import {
  exportTasksToJSON,
  exportTasksToCSV,
  importTasksFromJSON,
} from "../utils/exportImports";

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
      alert("No tasks to export!");
      return;
    }
    exportTasksToJSON(tasks, categories);
  };

  const handleExportCSV = () => {
    if (tasks.length === 0) {
      alert("No tasks to export!");
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
        alert("Import successful!");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Import failed");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="export-import">
      <h3>📦 Data Management</h3>
      <div className="export-import-buttons">
        <button
          onClick={handleExportJSON}
          className="btn-export"
          title="Export as JSON"
        >
          📥 Export JSON
        </button>
        <button
          onClick={handleExportCSV}
          className="btn-export"
          title="Export as CSV"
        >
          📊 Export CSV
        </button>
        <button
          onClick={handleImportClick}
          className="btn-import"
          title="Import from JSON"
        >
          📤 Import JSON
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ExportImport;
