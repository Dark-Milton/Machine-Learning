"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumanReadableCron = exports.getNextExecutionDate = exports.getNextExecutionAfterDate = exports.customShortDateFormat = exports.customDateFormat = void 0;
const DAY_OF_WEEK_NAME_TO_VALUE = new Map([
    ['SUN', 0],
    ['MON', 1],
    ['TUE', 2],
    ['WED', 3],
    ['THU', 4],
    ['FRI', 5],
    ['SAT', 6],
]);
const MONTH_NAME_TO_VALUE = new Map([
    ['JAN', 1],
    ['FEB', 2],
    ['MAR', 3],
    ['APR', 4],
    ['MAY', 5],
    ['JUN', 6],
    ['JUL', 7],
    ['AUG', 8],
    ['SEP', 9],
    ['OCT', 10],
    ['NOV', 11],
    ['DEC', 12],
]);
const DAY_OF_WEEK_VALUE_TO_NAME = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const MONTH_VALUE_TO_NAME = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const NUMBER_OF_DAYS_PER_MONTH = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];
//   Helper functions
function getDaysInMonth(month, year) {
    // if leap year and february
    if (year % 4 === 0 && year % 100 === 0 && year % 400 === 0 && month === 2) {
        return 29;
    }
    return NUMBER_OF_DAYS_PER_MONTH[month - 1];
}
function parseValue(value, allowedMin, allowedMax) {
    if (DAY_OF_WEEK_NAME_TO_VALUE.get(value) !== undefined) {
        return DAY_OF_WEEK_NAME_TO_VALUE.get(value);
    }
    if (MONTH_NAME_TO_VALUE.get(value) !== undefined) {
        return MONTH_NAME_TO_VALUE.get(value);
    }
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
        throw new Error('Invalid value in cron part');
    }
    if (parsedValue < allowedMin || parsedValue > allowedMax) {
        throw new Error('Value not in allowed range for cron string');
    }
    return parsedValue;
}
function createRange(lower, upper, step) {
    const output = [];
    for (let x = lower; x < upper + 1; x = x + step) {
        output.push(x);
    }
    return output;
}
function isAP(list) {
    if (list.length < 2) {
        return undefined;
    }
    const diff = list[1] - list[0];
    for (let x = 1; x < list.length - 1; x += 1) {
        const newDiff = list[x + 1] - list[x];
        if (newDiff !== diff) {
            return undefined;
        }
    }
    return diff;
}
function andJoin(list) {
    const lastElement = list.pop();
    return list.length > 0
        ? `${list.join(', ')} and ${lastElement}`
        : lastElement;
}
function addOrdinal(value) {
    if (value % 10 === 1 && value % 100 !== 11) {
        return `${value}st`;
    }
    if (value % 10 === 2 && value % 100 !== 12) {
        return `${value}nd`;
    }
    if (value % 10 === 3 && value % 100 !== 13) {
        return `${value}rd`;
    }
    return `${value}th`;
}
function getTextWithInterval(part, partName) {
    return part.allowsAll
        ? `every ${partName}`
        : part.interval
            ? `every ${addOrdinal(part.interval)} ${partName}`
            : `${partName} ${andJoin(part.values)}`;
}
function getValuesForSubexpression(subexpr, allowedMin, allowedMax, allValuesLength) {
    const subexprParts = subexpr.trim().split(',');
    const output = new Set();
    for (let part of subexprParts) {
        if (part === '')
            continue;
        let interval = undefined;
        let candidates = [];
        if (part.includes('/')) {
            const parts = part.split('/');
            part = parts[0];
            interval = Number(parts[1]);
        }
        if (part === '*') {
            candidates = createRange(allowedMin, allowedMax, interval || 1);
        }
        else if (!part.includes('-') && !interval) {
            candidates.push(parseValue(part, allowedMin, allowedMax));
        }
        else {
            let lowerLimit = undefined, upperLimit = undefined;
            if (part.includes('-')) {
                const limits = part.split('-');
                lowerLimit = parseValue(limits[0], allowedMin, allowedMax);
                upperLimit = parseValue(limits[1], allowedMin, allowedMax);
            }
            else {
                lowerLimit = parseValue(part, allowedMin, allowedMax);
                upperLimit = allowedMax;
            }
            if (upperLimit < lowerLimit) {
                throw new Error('Range not properly constructed in cron string');
            }
            candidates = createRange(lowerLimit, upperLimit, interval || 1);
        }
        candidates.forEach(item => {
            output.add(item);
        });
    }
    const values = Array.from(output).sort((n1, n2) => n1 - n2);
    let possibleInterval = isAP(values);
    if (!possibleInterval ||
        values[0] !== allowedMin ||
        values.length !== Math.ceil(allValuesLength / possibleInterval)) {
        possibleInterval = undefined;
    }
    return {
        values,
        allowsAll: values.length === allValuesLength,
        interval: possibleInterval,
    };
}
function isDateEligible(cron, date) {
    if (!cron.week.allowsAll && !cron.date.allowsAll) {
        return (cron.month.values.includes(date.getMonth() + 1) &&
            (cron.date.values.includes(date.getDate()) ||
                cron.week.values.includes(date.getDay())));
    }
    else {
        return (cron.month.values.includes(date.getMonth() + 1) &&
            cron.date.values.includes(date.getDate()) &&
            cron.week.values.includes(date.getDay()));
    }
}
function getCron(cronString) {
    const cronArray = cronString.toUpperCase().trim().split(' ');
    if (cronArray.length !== 5) {
        throw new Error('Cron string must have five parts');
    }
    return {
        week: getValuesForSubexpression(cronArray[4], 0, 6, 7),
        month: getValuesForSubexpression(cronArray[3], 1, 12, 12),
        date: getValuesForSubexpression(cronArray[2], 1, 31, 31),
        hour: getValuesForSubexpression(cronArray[1], 0, 23, 24),
        minute: getValuesForSubexpression(cronArray[0], 0, 59, 60),
    };
}
/**
 * Return date string that follows notebooks' custom date format
 */
function customDateFormat(date, timeZone, time = false) {
    if (!date) {
        return '';
    }
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone,
        hour12: true,
    };
    if (time) {
        return date.toLocaleTimeString('en-US', options);
    }
    return date.toLocaleDateString('en-US', Object.assign(Object.assign({}, options), { year: 'numeric', month: 'long', day: 'numeric' }));
}
exports.customDateFormat = customDateFormat;
function customShortDateFormat(date) {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
}
exports.customShortDateFormat = customShortDateFormat;
//Helper functions end
/**
 * Tries to find the next execution date after a given date for a given cron string
 */
function getNextExecutionAfterDate(cronString, date) {
    const cron = getCron(cronString);
    const nextDate = { valueSet: false };
    // check if it can be execution again on provided date
    if (isDateEligible(cron, date)) {
        if (cron.hour.values.includes(date.getHours()) &&
            cron.minute.values.filter(m => m > date.getMinutes()).length > 0) {
            nextDate.hour = date.getHours();
            nextDate.minute = cron.minute.values.filter(m => m > date.getMinutes())[0];
            nextDate.valueSet = true;
        }
        for (let hourIter = date.getHours() + 1; hourIter < 24 && !nextDate.valueSet; hourIter++) {
            if (cron.hour.values.includes(hourIter)) {
                nextDate.hour = hourIter;
                nextDate.minute = cron.minute.values[0];
                nextDate.valueSet = true;
            }
        }
        if (nextDate.valueSet) {
            nextDate.month = date.getMonth() + 1;
            nextDate.date = date.getDate();
            nextDate.year = date.getFullYear();
        }
    }
    // can't be execution on provided date, try any day after
    if (!nextDate.valueSet) {
        // earliest time in the day
        nextDate.minute = cron.minute.values[0];
        nextDate.hour = cron.hour.values[0];
        // try to stay in current month and current year, allow check for up to for
        // years away for leap year cases
        for (let yearIter = date.getFullYear(); yearIter <= date.getFullYear() + 4 && !nextDate.valueSet; yearIter++) {
            for (let monthIter = yearIter === date.getFullYear()
                ? date.getMonth() + 1
                : cron.month.values[0]; monthIter <= cron.month.values[cron.month.values.length - 1] &&
                !nextDate.valueSet; monthIter++) {
                // Have to go to all the days in the month because of week condition
                for (let dateIter = monthIter === date.getMonth() + 1 ? date.getDate() + 1 : 1; dateIter <= getDaysInMonth(monthIter, yearIter); dateIter++) {
                    const dateCandidate = new Date(yearIter, monthIter - 1, dateIter);
                    if (isDateEligible(cron, dateCandidate)) {
                        nextDate.date = dateIter;
                        nextDate.year = yearIter;
                        nextDate.month = monthIter;
                        nextDate.valueSet = true;
                        break;
                    }
                }
            }
        }
    }
    if (nextDate.valueSet) {
        return new Date(nextDate.year, nextDate.month - 1, nextDate.date, nextDate.hour, nextDate.minute);
    }
    else {
        // Should not occur if cron string is valid
        throw new Error('Could not find valid date');
    }
}
exports.getNextExecutionAfterDate = getNextExecutionAfterDate;
/**
 * Tries to find the next execution date after current date and time and returns
 * string for executions
 */
function getNextExecutionDate(cronString) {
    try {
        return `Executions are scheduled to start on ${customDateFormat(getNextExecutionAfterDate(cronString, new Date()))}`;
    }
    catch (err) {
        return '';
    }
}
exports.getNextExecutionDate = getNextExecutionDate;
/**
 * Tries to create a human readable version of the given cron string if possible
 * if timeZone is not provided, the system's timeZone will be used
 */
function getHumanReadableCron(cronString, timeZone) {
    let cron = undefined;
    try {
        cron = getCron(cronString);
    }
    catch (err) {
        return cronString;
    }
    let cronText = '';
    if (cron.date.allowsAll &&
        cron.week.allowsAll &&
        cron.minute.values.length === 1 &&
        cron.hour.values.length === 1) {
        cronText = ' every day';
    }
    if (!cron.date.allowsAll) {
        cronText += cron.date.interval
            ? ` every ${cron.date.interval} days`
            : ` on the ${andJoin(cron.date.values.map(ele => addOrdinal(ele)))}` +
                (cron.month.allowsAll ? ' of every month' : '');
    }
    if (!cron.month.allowsAll) {
        if (cronText !== '') {
            cronText += ' of';
        }
        const newValues = cron.month.values.map(ele => MONTH_VALUE_TO_NAME[ele - 1]);
        cronText += cron.month.interval
            ? ` every ${addOrdinal(cron.month.interval)} month`
            : ` ${andJoin(newValues)}`;
    }
    if (!cron.week.allowsAll) {
        if (!cron.date.allowsAll) {
            cronText += ' and';
        }
        cronText += ` on ${andJoin(cron.week.values.map(ele => DAY_OF_WEEK_VALUE_TO_NAME[ele]))}`;
    }
    if (cron.minute.allowsAll && cron.hour.allowsAll) {
        cronText += ' every minute';
    }
    else if (cron.minute.values.length === 1 && cron.hour.values.length === 1) {
        const date = new Date();
        date.setHours(cron.hour.values[0]);
        date.setMinutes(cron.minute.values[0]);
        cronText += ` at ${customDateFormat(date, timeZone, true)}`;
    }
    else {
        cronText += ` at ${getTextWithInterval(cron.minute, 'minute')}`;
        cronText += cron.minute.allowsAll ? ' of ' : ' past ';
        cronText += getTextWithInterval(cron.hour, 'hour');
    }
    cronText = cronText.trim();
    return cronText.charAt(0).toUpperCase() + cronText.slice(1);
}
exports.getHumanReadableCron = getHumanReadableCron;
