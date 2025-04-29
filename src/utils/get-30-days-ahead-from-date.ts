export function get30DaysAheadFromDate(startDate: Date) {
    const thirtyDaysInMs = 1000*60*60*24*30 

    const dateInMs = startDate.getTime() 

    const thirtyDayAheadFromDateInMs = dateInMs + thirtyDaysInMs

    return new Date(thirtyDayAheadFromDateInMs)
}