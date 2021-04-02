import { FileListEntry } from "./FileListEntry";
import { ITreeNode } from "./TreeNode";

/**
 * Control represents a table of files with columns: name with an icon, modified date and file size.
 */
export class FileList extends HTMLElement {
    private _fileNodes: ITreeNode[];
    private _selected: FileListEntry | null = null;

    /**
     * @param files array of file nodes to display; if it's not provided empty array is used
     */
    constructor(files?: ITreeNode[]) {
        super();
        this._fileNodes = files || [];
    }

    connectedCallback() {
        const header = this.appendChild(document.createElement('div'));
        header.className = 'row header';
        header.innerHTML = `
        <div class="cell name-column">
            <div class="icon"></div>Name
        </div>
        <div class="cell date-column">Date Modified</div>
        <div class="cell size-column">File Size</div>`;

        this.update();

        this.addEventListener('nodeselect', e => {
            if (this._selected)
                this._selected.selected = false;
            this._selected = e.target as FileListEntry;
            this._selected.selected = true;
        });
    }

    /**
     * File node array displayed in the table.
     */
    set files(value: ITreeNode[]) {
        this._fileNodes = value;
        this.update();
    }

    /**
     * Updates the DOM by removing existing entries and adding new ones in their place.
     */
    private update() {
        while (this.childElementCount > 1)
            this.lastElementChild?.remove();
        this._fileNodes.forEach(node => {
            this.appendChild(new FileListEntry(node))
        });
    }
}

customElements.define('file-list', FileList);