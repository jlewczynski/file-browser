import { TreeEntry } from "./TreeEntry";
import { ITreeNode } from "./TreeNode";

export class TreePanel extends HTMLElement {
    private fileNode: ITreeNode;
    private selected: TreeEntry | null = null;

    constructor(rootFile: ITreeNode) {
        super();
        this.fileNode = rootFile;
    }

    connectedCallback() {
        const root = new TreeEntry(this.fileNode, true, true);
        this.appendChild(root);
    }

    set rootFile(value: ITreeNode) {
        this.fileNode = value;
    }
}

customElements.define('tree-panel', TreePanel);
