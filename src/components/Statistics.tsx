import React, { useMemo } from "react";
import "./Statistics.css";
import { type Task } from "../types/Task";

interface StatisticsProps {
  tasks: Task[];
  isOpen: boolean;
  onClose: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ tasks, isOpen, onClose }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(
      (t) => t.dueDate && !t.completed && new Date(t.dueDate) < new Date()
    ).length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    // Tasks by category
    const categoryStats: { [key: string]: number } = {};
    tasks.forEach((task) => {
      task.categories.forEach((cat) => {
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      });
    });

    // Tasks created this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const createdThisWeek = tasks.filter(
      (t) => new Date(t.createdAt) >= oneWeekAgo
    ).length;

    // Tasks completed this week
    const completedThisWeek = tasks.filter(
      (t) => t.completed && new Date(t.createdAt) >= oneWeekAgo
    ).length;

    // Upcoming tasks (next 7 days)
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    const upcoming = tasks.filter(
      (t) =>
        t.dueDate &&
        !t.completed &&
        new Date(t.dueDate) <= oneWeekFromNow &&
        new Date(t.dueDate) >= new Date()
    ).length;

    // Average completion time (for completed tasks with due dates)
    const completedWithDates = tasks.filter((t) => t.completed && t.dueDate);
    const avgCompletionDays =
      completedWithDates.length > 0
        ? Math.round(
            completedWithDates.reduce((sum, t) => {
              const created = new Date(t.createdAt).getTime();
              const due = new Date(t.dueDate!).getTime();
              return sum + Math.abs(due - created) / (1000 * 60 * 60 * 24);
            }, 0) / completedWithDates.length
          )
        : 0;

    return {
      total,
      completed,
      active,
      overdue,
      completionRate,
      categoryStats,
      createdThisWeek,
      completedThisWeek,
      upcoming,
      avgCompletionDays,
    };
  }, [tasks]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="stats-modal-backdrop" onClick={handleBackdropClick}>
      <div className="stats-modal">
        <div className="stats-header">
          <h2>📊 Task Statistics</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="stats-content">
          {/* Overview Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>

            <div className="stat-card active">
              <div className="stat-icon">🔄</div>
              <div className="stat-value">{stats.active}</div>
              <div className="stat-label">Active</div>
            </div>

            <div className="stat-card danger">
              <div className="stat-icon">⚠️</div>
              <div className="stat-value">{stats.overdue}</div>
              <div className="stat-label">Overdue</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="completion-section">
            <h3>Completion Rate</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${stats.completionRate}%` }}
              >
                <span className="progress-text">{stats.completionRate}%</span>
              </div>
            </div>
          </div>

          {/* Activity This Week */}
          <div className="activity-section">
            <h3>This Week's Activity</h3>
            <div className="activity-grid">
              <div className="activity-item">
                <span className="activity-label">📝 Created</span>
                <span className="activity-value">{stats.createdThisWeek}</span>
              </div>
              <div className="activity-item">
                <span className="activity-label">✅ Completed</span>
                <span className="activity-value">
                  {stats.completedThisWeek}
                </span>
              </div>
              <div className="activity-item">
                <span className="activity-label">📅 Upcoming</span>
                <span className="activity-value">{stats.upcoming}</span>
              </div>
              {stats.avgCompletionDays > 0 && (
                <div className="activity-item">
                  <span className="activity-label">⏱️ Avg. Days</span>
                  <span className="activity-value">
                    {stats.avgCompletionDays}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          {Object.keys(stats.categoryStats).length > 0 && (
            <div className="category-section">
              <h3>Tasks by Category</h3>
              <div className="category-breakdown">
                {Object.entries(stats.categoryStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} className="category-stat-item">
                      <div className="category-stat-label">{category}</div>
                      <div className="category-stat-bar">
                        <div
                          className="category-stat-fill"
                          style={{
                            width: `${(count / stats.total) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="category-stat-count">{count}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="insights-section">
            <h3>💡 Insights</h3>
            <ul className="insights-list">
              {stats.completionRate >= 80 && (
                <li className="insight-item positive">
                  🎉 Great job! You're completing {stats.completionRate}% of
                  your tasks!
                </li>
              )}
              {stats.overdue > 0 && (
                <li className="insight-item warning">
                  ⚠️ You have {stats.overdue} overdue task
                  {stats.overdue > 1 ? "s" : ""}. Consider reviewing them.
                </li>
              )}
              {stats.upcoming > 0 && (
                <li className="insight-item info">
                  📅 {stats.upcoming} task{stats.upcoming > 1 ? "s are" : " is"}{" "}
                  due in the next 7 days.
                </li>
              )}
              {stats.completedThisWeek > stats.createdThisWeek && (
                <li className="insight-item positive">
                  💪 You completed more tasks than you created this week!
                </li>
              )}
              {stats.total === 0 && (
                <li className="insight-item info">
                  📝 Start by creating your first task!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
