import { TreeEntry } from "./TreeEntry";
import { getPath, ITreeNode } from "./TreeNode";

/**
 * Control that presents a foldable tree list of file nodes.
 */
export class TreePanel extends HTMLElement {
    private _rootNode: ITreeNode;
    private _selected: TreeEntry | null = null;

    /**
     * @param rootNode root file node of the panel
     */
    constructor(rootNode: ITreeNode) {
        super();
        this._rootNode = rootNode;
    }

    connectedCallback() {
        const root = new TreeEntry(this._rootNode, true, true);
        this._selected = root;
        root.addEventListener('nodeselect', e => {
            if (this._selected)
                this._selected.selected = false;
            this._selected = e.target as TreeEntry;
            this._selected.selected = true;
        })
        this.appendChild(root);
    }

    disconnectCallback() {
        this._selected = null;
    }

    /**
     * Sets the root file node of the panel;
     */
    set rootNode(value: ITreeNode) {
        this._rootNode = value;
        if (this.firstElementChild)
            (this.firstElementChild as TreeEntry).treeNode = this._rootNode;
    }

    /**
     * Gets and sets the currently selected folder.
     */
    get selected() {
        return this._selected?.treeNode || null;
    }
    set selected(node: ITreeNode | null) {
        if (!node && this._selected) {
            this._selected.selected = false;
            this._selected = null;
        } else if (node) {
            if (node.type !== 'folder')
                throw new Error('You can select only a folder.');

            const path = getPath(this._rootNode, node);
            if(path.length === 0)
                throw new Error('This node is not a part of the tree.')
            //remove the root element from the path, because the selection mechanism
            //searches through children nodes, so the first element is not a child
            //of any node and cannot be found this way
            path.shift();
            const parent = this.firstElementChild as TreeEntry | null;
            parent?.selectNode(...path);
        }
    }
}

customElements.define('tree-panel', TreePanel);
