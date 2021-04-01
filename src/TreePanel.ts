import { TreeEntry } from "./TreeEntry";
import { getPath, ITreeNode } from "./TreeNode";

export class TreePanel extends HTMLElement {
    private _rootNode: ITreeNode;
    private _selected: TreeEntry | null = null;

    constructor(rootNode: ITreeNode) {
        super();
        this._rootNode = rootNode;
    }

    connectedCallback() {
        const root = new TreeEntry(this._rootNode, true, true);
        this._selected = root;
        root.addEventListener('nodeselect', e => {
            if(this._selected)
                this._selected.selected = false;
            this._selected = e.target as TreeEntry;
            this._selected.selected = true;
        })
        this.appendChild(root);
    }

    set rootNode(value: ITreeNode) {
        this._rootNode = value;
        if(this.firstElementChild)
            (this.firstElementChild as TreeEntry).treeNode = this._rootNode;
    }

    select(node: ITreeNode) {
        const parent = this._selected ?? this.firstElementChild as TreeEntry;
        parent.selectChild(node);
    }

    get selected() {
        return this._selected?.treeNode || null;
    }

    set selected(node: ITreeNode | null) {
        if(!node && this._selected) {
            this._selected.selected = false;
            this._selected = null;
        } else if(node) {
            if(node.type !== 'folder')
                throw new Error('You can select only a folder.');

            const path = getPath(this._rootNode, node);
            let next = path.shift();
            while(next) {
                this.select(next);
                next = path.shift();
            }
        }
    }
}

customElements.define('tree-panel', TreePanel);
