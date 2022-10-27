import { Class } from "../api/getAvailableClasses";

type Schedule = Class["turmas"][number]["places"];

export function hasScheduleConflict(scheduleA: Schedule, scheduleB: Schedule) {
  const scheduleConflictFound = !!scheduleA.find((dayA) => {
    const scheduleConflictFound = !!scheduleB.find((dayB) =>
      hasConflict(dayA, dayB)
    );
    return scheduleConflictFound;
  });

  return scheduleConflictFound;
}
type Time = Class["turmas"][number]["places"][number];

function hasConflict(timeA: Time, timeB: Time) {
  if (timeA.weekDay !== timeB.weekDay) return false;
  if (timeA.startTime === timeB.startTime) return true;
  if (timeA.startTime < timeB.startTime) return timeA.endTime > timeB.startTime;
  if (timeA.startTime > timeB.startTime) return timeA.startTime < timeB.endTime;

  return false;
}
