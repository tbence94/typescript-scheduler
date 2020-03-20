import {assert} from 'chai'
import {Person, Entry} from '../src/types'
import {getPossibleMeetings, getDuration, timeToNumber, getFreeTimes, numberToTime} from '../src/solution-v1'

// Input
const person1: Person = {
    bounds: ['9:00', '20:00'],
    meetings: [
        ['9:00', '10:30'],
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

describe('Get possible meetings - V1', () => {
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

    it('Provides expected output for a 60 minute long meeting', () => {
        const meetingLength = 60
        const expectedOutput: Entry[] = [
            ['15:00', '16:00']
        ]

        const result = getPossibleMeetings(person1, person2, meetingLength)
        assert.deepStrictEqual(result, expectedOutput)
    })
})

describe('Free time getter', () => {
    it('Provides expected output for person 1', () => {
        const result = getFreeTimes(person1)
        assert.deepStrictEqual(result, [['10:30', '12:00'], ['13:00', '16:00'], ['18:00', '20:00']])
    })

    it('Provides expected output for person 1 - minimum 120 minutes', () => {
        const result = getFreeTimes(person1, 120)
        assert.deepStrictEqual(result, [['13:00', '16:00'], ['18:00', '20:00']])
    })

    it('Provides expected output for person 2', () => {
        const result = getFreeTimes(person2)
        assert.deepStrictEqual(result, [['11:30', '12:30'], ['15:00', '16:00'], ['17:00', '18:30']])
    })


    it('Provides expected output for person 2 - minimum 1440 minutes', () => {
        const result = getFreeTimes(person2, 1440)
        assert.deepStrictEqual(result, [])
    })
})

describe('Getting duration of time entries', () => {
    it('[\'11:10\', \'11:30\'] --> 20', () => {
        const result = getDuration(['11:10', '11:30'])
        assert.equal(result, 20)
    })

    it('[\'00:00\', \'24:00\'] --> 1440', () => {
        const result = getDuration(['00:00', '24:00'])
        assert.equal(result, 24 * 60)
    })
})

describe('Time to number conversion', () => {
    it('Provides expected output for 11:30', () => {
        const result = timeToNumber('11:30')
        assert.equal(result, 11 * 60 + 30)
    })

    it('Provides expected output for 00:00', () => {
        const result = timeToNumber('00:00')
        assert.equal(result, 0)
    })

    it('Provides expected output for 12:00', () => {
        const result = timeToNumber('12:00')
        assert.equal(result, 12 * 60)
    })

    it('Provides expected output for 24:00', () => {
        const result = timeToNumber('24:00')
        assert.equal(result, 24 * 60)
    })
})

describe('Number to time conversion', () => {
    it('Provides expected output for 11:30', () => {
        const result = numberToTime(11 * 60 + 30)
        assert.equal(result, '11:30')
    })

    it('Provides expected output for 00:00', () => {
        const result = numberToTime(0)
        assert.equal(result, '00:00')
    })

    it('Provides expected output for 12:00', () => {
        const result = numberToTime(12 * 60)
        assert.equal(result, '12:00')
    })

    it('Provides expected output for 24:00', () => {
        const result = numberToTime(24 * 60)
        assert.equal(result, '24:00')
    })
})
