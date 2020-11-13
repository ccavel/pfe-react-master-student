import { DateTime } from 'luxon';

const DATE_FORMAT = 'yyyy-MM-dd';

const uniqueFilter = (value, index, array) => array.indexOf(value) === index;

export const getSubdomains = (tabCues) => tabCues.map((cue) => cue.subdomain).filter(uniqueFilter);

// Compare dates using luxon library
const withinRange = (occurenceDate, date1, date2) => {
    const luxonOccurenceDate = DateTime.fromISO(occurenceDate);
    const luxonDate1 = DateTime.fromFormat(date1, DATE_FORMAT);
    const luxonDate2 = DateTime.fromFormat(date2, DATE_FORMAT);
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
