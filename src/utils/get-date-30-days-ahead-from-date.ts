import { thirtyDaysInMs } from "./thirty-days-in-ms"

export function getDate30DaysAheadFromDate(startDate: Date) {
    const dateInMs = startDate.getTime() 

    const thirtyDayAheadFromDateInMs = dateInMs + thirtyDaysInMs

    return new Date(thirtyDayAheadFromDateInMs)
}