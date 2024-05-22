"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortISO = exports.getWeek = exports.addDays = void 0;
function addDays(date, daysToAdd) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + daysToAdd);
    return clone;
}
exports.addDays = addDays;
function getWeek(forDate, daysOffset = 0) {
    const date = addDays(forDate, daysOffset);
    const day = date.getDay();
    return {
        date,
        start: addDays(date, -day),
        end: addDays(date, 6 - day)
    };
}
exports.getWeek = getWeek;
function shortISO(date) {
    return date.toISOString().split("T")[0];
}
exports.shortISO = shortISO;
