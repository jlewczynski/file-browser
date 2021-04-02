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

    /**
     * Sets the root file node of the panel;
     */
    set rootNode(value: ITreeNode) {
        this._rootNode = value;
        if (this.firstElementChild)
            (this.firstElementChild as TreeEntry).treeNode = this._rootNode;
    }

    /**
     * Moves selection from either the current selected node or the root node, if no node is selected,
     * to it's child node.
     * @param node target of selection change
     */
    select(...node: ITreeNode[]) {
        const parent = this._selected ?? this.firstElementChild as TreeEntry;
        parent.selectNode(...node);
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
            //of any node
            path.shift();
            this.select(...path);
        }
    }
}

customElements.define('tree-panel', TreePanel);
