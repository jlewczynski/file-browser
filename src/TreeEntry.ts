import { ITreeNode } from "./TreeNode";

type NodeSelectEvent = {
    entry: ITreeNode;
}

export class TreeEntry extends HTMLElement {
    private _entry: ITreeNode;
    private _opened: boolean;
    private _selected: boolean;
    private _subdirs: ITreeNode[];

    constructor(entry: ITreeNode, selected?: boolean, opened?: boolean) {
        super();
        if(entry.type === 'file')
            throw new Error('Tree entry node must be a folder.');
        this._entry = entry;
        this._subdirs = entry.children?.filter(e => e.type === 'folder') || [];
        this._opened = opened ?? false;
        this._selected = selected ?? false;
    }

    connectedCallback() {
        this.className = 'node';
        this.selected = this._selected;

        this.appendChild(document.createElement('span'))
        .onclick = () => this.toggle();

        const contains = this.appendChild(document.createElement('div'));
        contains.className = 'contains';

        const label = contains.appendChild(document.createElement('div'));
        label.className = 'label';
        label.innerHTML = `
        <img src="./img/dir.png" />
        <span class="dirname">${this._entry.name}</span>`;
        label.onclick = () => this.selectClicked();

        this.update();
    }

    private selectClicked() {
        this.dispatchEvent(
            new CustomEvent<NodeSelectEvent>(
                'nodeselected',
                {
                    bubbles: true,
                    detail: { entry: this._entry }
                }
            )
        );
    }

    set selected(val: boolean) {
        this._selected = val;
        if(this._selected)
            this.classList.add('selected');
        else
            this.classList.remove('selected');
    }

    toggle() {
        if(!this._entry.children?.length)
            return;
        this._opened = !this._opened;
        if(!this._opened)
            this.selectClicked();
        this.update();
    }

    private update() {
        if(this.firstElementChild) {
            if(!this._subdirs.length)
                this.firstElementChild.className = 'arrow';
            else if(this._opened)
                this.firstElementChild.className = 'arrow opened';
            else
                this.firstElementChild.className = 'arrow closed';
        }
        if(this.lastElementChild && this._subdirs.length) {
            if(this._opened) {
                for(const dir of this._subdirs){
                    const subEntry = new TreeEntry(dir);
                    this.lastElementChild.appendChild(subEntry);
                }
            } else {
                while(this.lastElementChild.childElementCount > 1)
                    this.lastElementChild.lastElementChild?.remove();
            }
        }
    }
}

customElements.define('tree-entry', TreeEntry);