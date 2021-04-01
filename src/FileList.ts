import { FileListEntry } from "./FileListEntry";
import { ITreeNode } from "./TreeNode";

export class FileList extends HTMLElement {
    private _fileNodes: ITreeNode[];
    private _selected: FileListEntry | null = null;

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

        this._fileNodes.forEach(node => {
            this.appendChild(new FileListEntry(node))
        });

        this.addEventListener('nodeselect', e => {
            if(this._selected)
                this._selected.selected = false;
            this._selected = e.target as FileListEntry;
            this._selected.selected = true;
        });
    }

    set files(value: ITreeNode[]) {
        this._fileNodes = value;
    }
}

customElements.define('file-list', FileList);