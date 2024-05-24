
export function addDays (date: any, daysToAdd: any) {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

export function getWeek (forDate: any, daysOffset = 0) {
  const date = addDays(forDate, daysOffset);
  const day = date.getDay();

  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day)
  };
}

export function shortISO (date: any) {
  return date?.toISOString().split("T")[0];
}

export const isDate = (date: any) => !isNaN(Date.parse(date));