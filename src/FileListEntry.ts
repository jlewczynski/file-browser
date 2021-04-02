import { NodeSelectEvent } from "./NodeSelectEvent";
import { ITreeNode } from "./TreeNode";
import { FileIcon } from "./FileIcon";

/**
 * Single file entry of the FileList.
 */
export class FileListEntry extends HTMLElement {
    private _entry: ITreeNode;
    private _selected: boolean;

    /**
     * @param entry file node repersented by the control
     * @param selected should the entry be selected when rendered
     */
    constructor(entry: ITreeNode, selected?: boolean) {
        super();
        this._entry = entry;
        this._selected = selected ?? false;
    }

    connectedCallback() {
        this.className = 'row';
        this.selected = this._selected;
        this.onclick = () => this.selectClicked();
        this.ondblclick = () => {
            if (this._entry.type === 'folder')
                this.selectClicked(true);
        }

        this.addCell('name', this._entry.name, getIcon(this._entry));
        this.addCell('date', this._entry.modified.toLocaleDateString());
        this.addCell('size', this._entry.type === 'file' ? formatFileSize(this._entry.size) : '');
    }

    /**
     * Adds a cell to the current row.
     *
     * @param col column name; with suffix -column creates a style name used for sizing
     * @param text displayed string
     * @param icon element that can be appended before the text in the cell
     */
    private addCell(col: string, text: string, icon?: HTMLElement) {
        const column = this.appendChild(document.createElement('div'));
        column.className = `cell ${col}-column`;
        if (icon)
            column.appendChild(icon);
        column.appendChild(document.createTextNode(text));
    }

    /**
     * Dispatches a NodeSelectEvent.
     *
     * @param open was the row double-clicked
     */
    private selectClicked(open?: boolean) {
        this.dispatchEvent(new NodeSelectEvent(this._entry, open));
    }

    /**
     * Selection of current row. Setting it modifies the DOM styles.
     */
    set selected(val: boolean) {
        this._selected = val;
        if (this._selected)
            this.classList.add('selected');
        else
            this.classList.remove('selected');
    }
}

function getExt(name: string): string {
    const m = name.match(/.+\.([^.]+)$/);
    if (m)
        return m[1];
    return '';
}

function getIcon(entry: ITreeNode): HTMLElement {
    let result: HTMLElement;
    if (entry.type === 'folder') {
        result = document.createElement('img');
        (result as HTMLImageElement).src = './img/dir.png';
    } else
        result = new FileIcon(getExt(entry.name));
    result.className = 'icon';
    return result;
}

function formatFileSize(size: number): string {
    if (size < 1024)
        return `${size} KB`;
    else if (size < 1024 * 1024)
        return `${(size / 1024).toFixed(2)} MB`;
    else
        return `${(size / (1024 * 1024)).toFixed(2)} GB`
}

customElements.define('file-list-entry', FileListEntry);
