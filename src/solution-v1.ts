import {
    Entry,
    Person
} from './types'

export function getPossibleMeetings(person1: Person, person2: Person, meetingLength: number): Entry[] {
    const freeTimes1 = getFreeTimes(person1, meetingLength)
    const freeTimes2 = getFreeTimes(person2, meetingLength)

    const results = []

    for (const freeTime1 of freeTimes1) {
        for (const freeTime2 of freeTimes2) {
            const [s1, e1] = freeTime1
            const [s2, e2] = freeTime2

            const maxStart = Math.max(timeToNumber(s1), timeToNumber(s2))
            const minEnd = Math.min(timeToNumber(e1), timeToNumber(e2))

            if (maxStart <= (minEnd - meetingLength)) {
                results.push([numberToTime(maxStart), numberToTime(minEnd)])
            }
        }
    }

    return results
}

export function getFreeTimes(person: Person, minDuration: number = null): string[][] {
    const [startOfDay, endOfDay] = person.bounds
    const times = [startOfDay, ...([]).concat(...person.meetings), endOfDay]

    const freeTimes = []

    for (let i = 0; i < times.length; i += 2) {
        const start = times[i]
        const end = times[i + 1]

        if (start !== end) {
            if (minDuration && getDuration([start, end]) < minDuration) {
                continue
            }

            freeTimes.push([start, end])
        }
    }

    return freeTimes
}

export function getDuration(entry: Entry) {
    const [start, end] = entry
    return timeToNumber(end) - timeToNumber(start)
}

export function timeToNumber(timeString: string): number {
    const [hours, minutes] = timeString.split(':')
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10)
}

export function numberToTime(minutes: number): string {
    const hh = `0${Math.floor(minutes / 60)}`.substr(-2)
    const mm = `0${Math.floor(minutes % 60)}`.substr(-2)
    return [hh, mm].join(':')
}
