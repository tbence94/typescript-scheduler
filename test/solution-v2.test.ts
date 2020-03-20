import {assert} from 'chai'
import {Person, Entry} from '../src/types'
import {getPossibleMeetings, joinOverlappingEntries, mergeCalendars} from '../src/solution-v2'

// Input
const person1: Person = {
    bounds: ['09:00', '20:00'],
    meetings: [
        ['09:00', '10:30'],
        ['12:00', '13:00'],
        ['16:00', '18:00']
    ]
}

const person2: Person = {
    bounds: ['10:00', '18:30'],
    meetings: [
        ['10:00', '11:30'],
        ['12:30', '14:30'],
        ['14:30', '15:00'],
        ['16:00', '17:00']
    ]
}

const person3: Person = {
    bounds: ['10:00', '18:30'],
    meetings: [
        ['10:00', '11:30'],
    ]
}

describe('Get possible meetings - V2', () => {
    it('Provides expected output for a 30 minute long meeting', () => {
        const meetingLength = 30
        const expectedOutput: Entry[] = [
            ['11:30', '12:00'],
            ['15:00', '16:00'],
            ['18:00', '18:30']
        ]

        const result = getPossibleMeetings(person1, person2, meetingLength)
        assert.deepStrictEqual(result, expectedOutput)
    })

    it('Provides expected output for a 30 minute long meeting - reversed input', () => {
        const meetingLength = 30
        const expectedOutput: Entry[] = [
            ['11:30', '12:00'],
            ['15:00', '16:00'],
            ['18:00', '18:30']
        ]

        const result = getPossibleMeetings(person2, person1, meetingLength)
        assert.deepStrictEqual(result, expectedOutput)
    })

    it('Provides expected output for a 30 minute long meeting - less meetings', () => {
        const meetingLength = 30
        const expectedOutput: Entry[] = [
            ['11:30', '12:00'],
            ['13:00', '16:00'],
            ['18:00', '18:30']
        ]

        const result = getPossibleMeetings(person1, person3, meetingLength)
        assert.deepStrictEqual(result, expectedOutput)
    })

    it('Provides expected output for a 60 minute long meeting', () => {
        const meetingLength = 60
        const expectedOutput: Entry[] = [
            ['15:00', '16:00']
        ]

        const result = getPossibleMeetings(person1, person2, meetingLength)
        assert.deepStrictEqual(result, expectedOutput)
    })
})

describe('Get merged calendars', () => {
    it('Provides expected output', () => {
        const expectedOutput: Entry[] = [
            ['00:00', '10:00'],
            ['09:00', '10:30'],
            ['10:00', '11:30'],
            ['12:00', '13:00'],
            ['12:30', '14:30'],
            ['14:30', '15:00'],
            ['16:00', '18:00'],
            ['16:00', '17:00'],
            ['18:30', '24:00']
        ]

        const result = mergeCalendars(person1, person2)
        assert.deepStrictEqual(result, expectedOutput)
    })
})

describe('Get calendars where overlaps were merged', () => {
    it('Provides expected output', () => {
        const expectedOutput: Entry[] = [
            ['00:00', '11:30'],
            ['12:00', '15:00'],
            ['16:00', '18:00'],
            ['18:30', '24:00']
        ]

        const result = joinOverlappingEntries(mergeCalendars(person1, person2))
        assert.deepStrictEqual(result, expectedOutput)
    })
})


