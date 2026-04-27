import { useState, useEffect } from "react";

export default function useProgress(tenant, userId) {
  const [progressData, setProgressData] = useState({});

  const storageKey = `edukate_progress_${tenant}_${userId}`;

  useEffect(() => {
    if (!tenant || !userId) {
      setProgressData({});
      return;
    }
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setProgressData(JSON.parse(stored));
    } else {
      setProgressData({});
    }
  }, [tenant, userId, storageKey]);

  const toggleLecture = (courseId, lectureId, totalLectures) => {
    if (!tenant || !userId) return;

    setProgressData((prev) => {
      const courseRecord = prev[courseId] || {
        completed: [],
        total: totalLectures,
      };
      let newCompleted = [...courseRecord.completed];

      if (newCompleted.includes(lectureId)) {
        newCompleted = newCompleted.filter((id) => id !== lectureId); // Unmark
      } else {
        newCompleted.push(lectureId); // Mark
      }

      const updated = {
        ...prev,
        [courseId]: { completed: newCompleted, total: totalLectures },
      };

      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const getCourseProgress = (courseId) => {
    const data = progressData[courseId];
    if (!data || !data.total || data.total === 0) return 0;
    return Math.round((data.completed.length / data.total) * 100);
  };

  const isCompleted = (courseId, lectureId) => {
    return progressData[courseId]?.completed?.includes(lectureId) || false;
  };

  return { toggleLecture, getCourseProgress, isCompleted };
}
