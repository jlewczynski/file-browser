import { FileList } from './FileList';
import { NodeSelectEvent } from './NodeSelectEvent';
import { deepCopyNode, ITreeNode } from './TreeNode';
import { TreePanel } from './TreePanel';

class FileBrowser extends HTMLElement {

    private _rootNode: ITreeNode;
    private _treePanel: TreePanel | null = null;
    private _fileList: FileList | null = null;

    constructor(nodes?: ITreeNode[]) {
        super();
        this._rootNode = {
            type: 'folder',
            name: 'Files',
            modified: new Date(),
            size: 0,
            children: nodes ?? []
        }
    }

    connectedCallback() {
        this.classList.add('viewer');

        this._treePanel = this.appendChild(new TreePanel(this._rootNode));
        this._treePanel.addEventListener('nodeselect', e => {
            if(this._fileList)
                this._fileList.files = (e as NodeSelectEvent).detail.entry.children || [];
        })

        this._fileList = this.appendChild(new FileList(this._rootNode.children || []));
        this._fileList.addEventListener('nodeselect', e => {
            e.stopPropagation();
            if((e as NodeSelectEvent).detail.open && this._treePanel)
                this._treePanel.select((e as NodeSelectEvent).detail.entry);
        })
    }

    disconnectedCallback() {
        this._treePanel = null;
        this._fileList = null;
    }

    get files() {
        return this._rootNode.children || [];
    }
    set files(value: ITreeNode[]) {
        this._rootNode.children = value;
        //update sub-panels
        if(this._treePanel)
            this._treePanel.rootNode = this._rootNode;
        if(this._fileList)
            this._fileList.files = this._rootNode.children || [];
    }

    get selected() {
        return this._treePanel?.selected || null;
    }

    set selected(v: ITreeNode | null) {
        if(this._treePanel)
            this._treePanel.selected = v;
    }
}

customElements.define('file-browser', FileBrowser);
