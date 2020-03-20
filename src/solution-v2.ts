import {
    Entry,
    Person
} from './types'

export function getPossibleMeetings(person1: Person, person2: Person, meetingLength: number): Entry[] {
    const results = []

    // Merge in sorted order --> booked_times
    // Mutate booked_times and join overlaps
    const bookedTimes = joinOverlappingEntries(mergeCalendars(person1, person2))

    // Get free periods
    for (let i = 0; i < bookedTimes.length - 1; i++) {
        const [start1, end1] = bookedTimes[i]
        const [start2, end2] = bookedTimes[i + 1]

        if (timeToNumber(start2) - timeToNumber(end1) >= meetingLength) {
            results.push([end1, start2])
        }
    }

    return results
}

export function joinOverlappingEntries(entries: Entry[]): Entry[] {
    const results: Entry[] = [[entries[0][0], entries[0][1]]]

    let i: number = 1

    while (i < entries.length) {
        const lastEntry = results[results.length - 1]
        const [start1, end1] = lastEntry
        const [start2, end2] = entries[i]

        if (timeToNumber(start2) <= timeToNumber(end1)) {
            if (timeToNumber(end2) > timeToNumber(end1)) {
                // lastEntry contains start of 'i' --> they can be merged. --> the end of last entry is end2
                lastEntry[1] = end2
            }
            // or lastEntry fully contains 'i'
        } else {
            // they don't overlap
            results.push([start2, end2])
        }

        i++
    }

    return results
}

export function mergeCalendars(person1: Person, person2: Person): Entry[] {
    const bookedTimes = []

    // Add start of day bounds as booked time
    if (timeToNumber(person1.bounds[0]) > timeToNumber(person2.bounds[0])) {
        bookedTimes.push(['00:00', person1.bounds[0]])
    } else {
        bookedTimes.push(['00:00', person2.bounds[0]])
    }

    // Merge and keep it sorted by start time
    let p1: number = 0;
    let p2: number = 0;
    while (p1 < person1.meetings.length || p2 < person2.meetings.length) {
        if (!person1.meetings[p1]) {
            bookedTimes.push(person2.meetings[p2])
            p2++;
            continue;
        }

        if (!person2.meetings[p2]) {
            bookedTimes.push(person1.meetings[p1])
            p1++;
            continue;
        }

        if (timeToNumber(person1.meetings[p1][0]) <= timeToNumber(person2.meetings[p2][0])) {
            bookedTimes.push(person1.meetings[p1])
            p1++;
        } else {
            bookedTimes.push(person2.meetings[p2])
            p2++;
        }
    }

    // Add end of day bounds as booked time
    if (timeToNumber(person1.bounds[1]) < timeToNumber(person2.bounds[1])) {
        bookedTimes.push([person1.bounds[1], '24:00'])
    } else {
        bookedTimes.push([person2.bounds[1], '24:00'])
    }

    return bookedTimes
}

export function timeToNumber(timeString: string): number {
    const [hours, minutes] = timeString.split(':')
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10)
}
