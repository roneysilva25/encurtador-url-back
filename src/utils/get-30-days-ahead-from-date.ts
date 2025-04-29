import { thirtyDaysInMs } from "./thirty-days-in-ms"

export function get30DaysAheadFromDate(startDate: Date) {
    const dateInMs = startDate.getTime() 

    const thirtyDayAheadFromDateInMs = dateInMs + thirtyDaysInMs

    return new Date(thirtyDayAheadFromDateInMs)
}