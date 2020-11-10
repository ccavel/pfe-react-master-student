let dragSrcEl = null;
// eslint-disable-next-line import/no-mutable-exports
export let namePreviousDropElt = 'unknown';
// eslint-disable-next-line import/no-mutable-exports
export let nameDropElt = 'unknown';

function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter() {
    // this / e.target is the current hover target.
}

function handleDragLeave() {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl !== this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        this.parentNode.removeChild(dragSrcEl);
        const dropHTML = e.dataTransfer.getData('text/html');
        // eslint-disable-next-line prefer-destructuring
        nameDropElt = dropHTML.split('<header>')[1].split('</header')[0];
        this.insertAdjacentHTML('beforebegin', dropHTML);
        const dropElem = this.previousSibling;
        if (dropElem.previousSibling !== null) {
            // eslint-disable-next-line prefer-destructuring
            namePreviousDropElt = dropElem.previousSibling.outerHTML.split('<header>')[1].split('</header')[0];
        }
        addDnDHandlers(dropElem);
        console.log(`DragEnd ${document.getElementById('myChart')}`);
    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd() {
    // this/e.target is the source node.
    this.classList.remove('over');
    this.classList.remove('dragElem');
}

export function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false);
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);
}
