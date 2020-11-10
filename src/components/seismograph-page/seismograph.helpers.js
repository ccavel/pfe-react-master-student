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

// eslint-disable-next-line complexity
export function changeYvalue(nameDropElt, namePreviousDropElt, tabAllSubdomain, dataXYRTab) {
    let oldNumDropElt; let newNumDropElt;
    let oldY; let newY;
    const nbSubdomain = tabAllSubdomain.lengt;

    // on ne gère pas le cas où l'élément est droppé au même endroit

    // On récupère l'indice de la position de l'élement déplacé (avant et après déplacement) dans la liste des subdomains
    for (let i = 0; i < nbSubdomain; i++) {
        if (namePreviousDropElt === 'unknown') {
            console.log('ERROR previous element not assign');
        } else if (namePreviousDropElt === null) { // cas où l'élément n'a pas d'élément précédent, aka, c'est le 1er dans la lsite
            newNumDropElt = 0;
            newY = nbSubdomain - 0.5; // nbTotal -1 car on commence à zéro, et (+0.5) car lespoint s'affiche au milieu des lignes
        } else if (tabAllSubdomain[i] === (namePreviousDropElt)) {
            newNumDropElt = i + 1;
            newY = nbSubdomain - i - 0.5;
        }
        if (tabAllSubdomain[i] === (nameDropElt)) {
            oldNumDropElt = i;
            oldY = nbSubdomain - 0.5;
        }
    }
    // ici insérer la màj du tableau tabAllSubdomain

    // si le subdomain est décalé vers le bas
    if (oldNumDropElt < newNumDropElt) {
        for (let j = 0; j < dataXYRTab.length; j++) { // on parcourt toutes les cues
            if (dataXYRTab[j].y === (oldY)) { // si l'élément est celui qu'on a déplacé, on lui attribue une valeur spéciale en attendant la permutation
                // eslint-disable-next-line no-param-reassign
                dataXYRTab[j].y = null;
            } else if ((dataXYRTab[j].y >= newY) && (dataXYRTab[j].y < oldY)) {
                // eslint-disable-next-line no-param-reassign
                dataXYRTab[j].y += 1;
            }
        }
        // on rétablie la valeur des Y des cues du subdomain déplacé
        for (let j = 0; j < dataXYRTab.length; j++) {
            if (dataXYRTab[j].y === null) {
                dataXYRTab[j].y = newY;
            }
        }
    } else { // si le subdomain est décalé vers le haut
        for (let j = 0; j < dataXYRTab.length; j++) { // on parcourt toutes les cues
            if (dataXYRTab[j].y === (oldY)) { // si l'élément est celui qu'on a déplacé, on lui attribue une valeur spéciale en attendant la permutation
                // eslint-disable-next-line no-param-reassign
                dataXYRTab[j].y = null;
            } else if ((dataXYRTab[j].y <= newY) && (dataXYRTab[j].y > oldY)) {
                // eslint-disable-next-line no-param-reassign
                dataXYRTab[j].y -= 1;
            }
        }
        // on rétablie la valeur des Y des cues du subdomain déplacé
        for (let j = 0; j < dataXYRTab.length; j++) {
            if (dataXYRTab[j].y === null) {
                dataXYRTab[j].y = newY;
            }
        }
    }
    return dataXYRTab;
}
