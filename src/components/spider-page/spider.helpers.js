// returns tabDom =
// [[domain 1, domain 2, domain 3, ...], [nb cues for domain 1 in 1st period, nb cues for domain 2 in 1st period, ...], [nb cues for dom 1 in 2nd period, ...]]
export function getSubdomain(tabCues, tableauDates) {
    const tabDom = [[], [], []];
    for (let i = 0; i < tabCues.length; i++) {
        const dom = tabCues[i].subdomain;
        const dateDom = new Date(tabCues[i].action[0].startDate);
        const posDom = tabDom[0].indexOf(dom);

        const dateInFirstPeriod = (dateDom > tableauDates[0]) && (dateDom < tableauDates[1]);
        const dateInSecondPeriod = (dateDom > tableauDates[2]) && (dateDom < tableauDates[3]);
        if (dateInFirstPeriod || dateInSecondPeriod) {
            if (posDom !== -1) {
                if (dateInFirstPeriod) {
                    tabDom[1][posDom] += 1;
                }
                if (dateInSecondPeriod) {
                    tabDom[2][posDom] += 1;
                }
            } else {
                tabDom[0].push(dom);
                if (dateInFirstPeriod) {
                    tabDom[1].push(1);
                } else {
                    tabDom[1].push(0);
                }
                if (dateInSecondPeriod) {
                    tabDom[2].push(1);
                } else {
                    tabDom[2].push(0);
                }
            // console.log(tabDom);
            }
        }
    }

    return tabDom;
}
