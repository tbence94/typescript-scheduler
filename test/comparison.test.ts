import {Person, Entry} from '../src/types'
import {getPossibleMeetings as getPossibleMeetings1} from '../src/solution-v1'
import {getPossibleMeetings as getPossibleMeetings2} from '../src/solution-v2'

const person1: Person = {
    bounds: ['00:00', '24:00'],
    meetings: []
}

const person2: Person = {
    bounds: ['00:00', '24:00'],
    meetings: []
}

function addMeetings (person): Person {
    const times = []
    for (let i = 0; i < 200; i++) {
        times.push(Math.floor(Math.random() * (24 * 60))) // 0 - 1440
        times.push(Math.floor(Math.random() * (24 * 60))) // 0 - 1440
    }

    times.sort((a, b) => a - b)

    for (let i = 0; i < times.length; i += 2) {
        person.meetings.push([
            numberToTime(times[i]),
            numberToTime(times[i+1])
        ])
    }

    return person
}

function numberToTime(minutes): string {
    const hh = `0${Math.floor(minutes / 60)}`.substr(-2)
    const mm = `0${Math.floor(minutes % 60)}`.substr(-2)
    return [hh, mm].join(':')
}

addMeetings(person1)
addMeetings(person2)

describe('Compare performance for large inputs', () => {
    it('V1 calculates output for large dataset', () => {
        getPossibleMeetings1(person1, person2, 5)
    })

    it('V2 calculates output for large dataset', () => {
        getPossibleMeetings2(person1, person2, 5)
    })
})
