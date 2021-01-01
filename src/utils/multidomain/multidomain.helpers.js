import { DateTime } from 'luxon';

const uniqueFilter = (value, index, array) => array.indexOf(value) === index;

export const getSubdomains = (tabCues) => tabCues.map((cue) => cue.subdomain).filter(uniqueFilter);

/* ***********************************************************************
 *      SPIDER
 * ***********************************************************************/

const INPUT_DATE_FORMAT = 'yyyy-MM-dd';

// Compare dates using luxon library
const withinRange = (occurenceDate, date1, date2) => {
    const luxonOccurenceDate = DateTime.fromISO(occurenceDate);
    const luxonDate1 = DateTime.fromFormat(date1, INPUT_DATE_FORMAT);
    const luxonDate2 = DateTime.fromFormat(date2, INPUT_DATE_FORMAT);
    return luxonDate1 <= luxonOccurenceDate && luxonOccurenceDate <= luxonDate2;
};

export const getNbCuesBySubDomainForDateRange = (startDate, endDate, subDomains, tabCues) => {
    const nbCuesByDomain = [];
    for (const subdomain of subDomains) {
        if (startDate && endDate) {
            // get cues for the domain
            const cues = tabCues.filter((cue) => cue.subdomain === subdomain);
            // for each cue, get the occurences within the specified date range
            const nbOccurencesWithinDateRange = cues.reduce((acc, cue) => {
                const occurencesWithinRange = cue.occurences.filter((occurence) => withinRange(occurence.computationTime, startDate, endDate));
                return acc + occurencesWithinRange.length;
            }, 0);
            nbCuesByDomain.push(nbOccurencesWithinDateRange);
        } else {
            nbCuesByDomain.push(0);
        }
    }
    return nbCuesByDomain;
};

/* ***********************************************************************
 *      SEISMOGRAPH
 * ***********************************************************************/

export const buildSeismographData = (cues) => {
    const cueOccurencesById = {}; // Id = <day>-<domain>, ex: 2020-01-02T10:44:32.427Z-maritime
    // Iterate on cues
    for (let i = 0; i < cues.length; i++) {
        const cue = cues[i];
        // Iterate on each cue's occurences
        for (let j = 0; j < cue.occurences.length; j++) {
            const occurence = cue.occurences[j];
            const decimal = occurence.computationTime.slice(11, 13) * 0.01;
            const unit = occurence.computationTime.slice(8, 10) * 1;
            const dayNumber = unit + decimal; // dayNumber = DAY,H (ex: 1,12 correspond à 01 à 12h)

            const id = `${dayNumber}-${cue.subdomain}`;
            // Check if there is already one occurence for this specific domain on this specific day
            if (cueOccurencesById[id]) {
                cueOccurencesById[id].nbOccurences += 1;
            } else {
                cueOccurencesById[id] = {
                    dayNumber,
                    subdomain: cue.subdomain,
                    weighting: cue.weighting,
                };
            }
        }
    }
    return Object.values(cueOccurencesById).map((o) => ({
        ...o,
        x: o.dayNumber, // x-axis = day
        // y-axis = domain. Domains can be dinamycally re-ordered so the y value is calculated in a dedicated function
        r: o.weighting, // radius: weight of the cue
    }));
};

export const orderSeismographDataBySubDomain = (seismographData, subdomains) => seismographData.map((value) => ({
    ...value,
    y: subdomains.findIndex((domain) => domain.localeCompare(value.subdomain, 'en', { sensitivity: 'base' }) === 0) + 0.5,
}));
