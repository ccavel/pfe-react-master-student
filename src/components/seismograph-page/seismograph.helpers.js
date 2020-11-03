export function selectAllSubdomain(tabCues = []) {
    // fonction qui renvoie un tableau avec les subdomains utilisé (sans doublons)
    const tabSubdomains = [];
    let double = false;
    for (let i = 0; i < tabCues.length; i++) {
        for (let j = 0; j < tabSubdomains.length; j++) {
            if (tabCues[i].subdomain === tabSubdomains[j]) {
                double = true;
            }
        }
        if (double === false) {
            tabSubdomains.push(tabCues[i].subdomain);
        }
        double = false;
    }
    return tabSubdomains;
}

// fonction qui trie les cue en fonction de leur subdomain en leur attribuant une valeur Y
// elle renvoie un tableau contenant les coordonnées Y des cues à la suite
function setYValue(tabCues = []) {
    const tabSubdomains = selectAllSubdomain(tabCues);
    const tabY = [];
    for (let i = 0; i < tabCues.length; i++) {
        for (let j = 0; j < tabSubdomains.length; j++) {
            if (tabCues[i].subdomain === tabSubdomains[j]) {
                tabY.push(j);
            }
        }
    }
    return tabY;
}

export function setXYRValue(tabCues = []) {
    // fonction qui renvoie un tableau contenant les coordonnées X,Y et R pour chaque cue
    const tabY = setYValue(tabCues);
    const tabCueXYR = [];
    let compteur = 0;
    let x; let y; let
        r;
    for (let i = 0; i < tabCues.length; i++) {
        x = parseInt(
            tabCues[i].action[0].startDate.substring(0, 4) +
                tabCues[i].action[0].startDate.substring(5, 7) +
                tabCues[i].action[0].startDate.substring(8, 10)
        );
        r = tabCues[i].weighting;
        y = tabY[compteur] + 0.5;
        tabCueXYR.push({ x, y, r });
        compteur++;
    }
    return tabCueXYR;
}
