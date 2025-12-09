import React, { useMemo } from "react";
import { type Task } from "../types/Task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

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

    const categoryStats: { [key: string]: number } = {};
    tasks.forEach((task) => {
      task.categories.forEach((cat) => {
        categoryStats[cat] = (categoryStats[cat] || 0) + 1;
      });
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const createdThisWeek = tasks.filter(
      (t) => new Date(t.createdAt) >= oneWeekAgo
    ).length;

    const completedThisWeek = tasks.filter(
      (t) => t.completed && new Date(t.createdAt) >= oneWeekAgo
    ).length;

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    const upcoming = tasks.filter(
      (t) =>
        t.dueDate &&
        !t.completed &&
        new Date(t.dueDate) <= oneWeekFromNow &&
        new Date(t.dueDate) >= new Date()
    ).length;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Task Statistics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
            </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-6 w-6 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{stats.active}</div>
                  <div className="text-sm text-muted-foreground">Active</div>
            </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <AlertTriangle className="h-6 w-6 text-destructive mb-2" />
                  <div className="text-2xl font-bold">{stats.overdue}</div>
                  <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rate */}
          <div className="space-y-2">
            <h3 className="font-semibold">Completion Rate</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{stats.completionRate}%</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>
          </div>

          {/* Activity This Week */}
          <div className="space-y-3">
            <h3 className="font-semibold">This Week's Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-sm text-muted-foreground mb-1">📝 Created</span>
                <span className="text-xl font-bold">{stats.createdThisWeek}</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-sm text-muted-foreground mb-1">✅ Completed</span>
                <span className="text-xl font-bold">{stats.completedThisWeek}</span>
              </div>
              <div className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-sm text-muted-foreground mb-1">📅 Upcoming</span>
                <span className="text-xl font-bold">{stats.upcoming}</span>
              </div>
              {stats.avgCompletionDays > 0 && (
                <div className="flex flex-col items-center p-3 border rounded-lg">
                  <span className="text-sm text-muted-foreground mb-1">⏱️ Avg. Days</span>
                  <span className="text-xl font-bold">{stats.avgCompletionDays}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          {Object.keys(stats.categoryStats).length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Tasks by Category</h3>
              <div className="space-y-2">
                {Object.entries(stats.categoryStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <Progress
                        value={(count / stats.total) * 100}
                        className="h-1.5"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="space-y-2">
            <h3 className="font-semibold">💡 Insights</h3>
            <div className="space-y-2">
              {stats.completionRate >= 80 && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                    🎉 Great job! You're completing {stats.completionRate}% of your
                    tasks!
                  </p>
                </div>
              )}
              {stats.overdue > 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm">
                  ⚠️ You have {stats.overdue} overdue task
                  {stats.overdue > 1 ? "s" : ""}. Consider reviewing them.
                  </p>
                </div>
              )}
              {stats.upcoming > 0 && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    📅 {stats.upcoming} task{stats.upcoming > 1 ? "s are" : " is"} due
                    in the next 7 days.
                  </p>
                </div>
              )}
              {stats.completedThisWeek > stats.createdThisWeek && (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm">
                  💪 You completed more tasks than you created this week!
                  </p>
                </div>
              )}
              {stats.total === 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">📝 Start by creating your first task!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Statistics;
