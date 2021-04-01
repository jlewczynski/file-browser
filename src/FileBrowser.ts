import { FileList } from './FileList';
import { NodeSelectEvent } from './NodeSelectEvent';
import { deepCopyNode, ITreeNode } from './TreeNode';
import { TreePanel } from './TreePanel';

class FileBrowser extends HTMLElement {

    private rootFile: ITreeNode;
    private treePanel: TreePanel | null = null;
    private fileList: FileList | null = null;

    constructor(nodes?: ITreeNode[]) {
        super();
        this.rootFile = {
            type: 'folder',
            name: 'Files',
            modified: new Date(),
            size: 0,
            children: nodes ?? []
        }
    }

    connectedCallback() {
        this.classList.add('viewer');

        this.treePanel = this.appendChild(new TreePanel(this.rootFile));
        this.treePanel.addEventListener('nodeselect', e => {
            if(this.fileList)
                this.fileList.files = (e as NodeSelectEvent).detail.entry.children || [];
        })

        this.fileList = this.appendChild(new FileList(this.rootFile.children || []));
        this.fileList.addEventListener('nodeselect', e => {
            e.preventDefault();
            if((e as NodeSelectEvent).detail.open && this.treePanel)
                this.treePanel.select((e as NodeSelectEvent).detail.entry);
        })
    }

    get files() {
        return this.rootFile.children?.map(n => deepCopyNode(n)) || [];
    }
    set files(value: ITreeNode[]) {
        this.rootFile.children = value.map(n => deepCopyNode(n));
        //update sub-panels
        if(this.treePanel)
            this.treePanel.rootFile = this.rootFile;
        if(this.fileList)
            this.fileList.files = this.rootFile.children || [];
    }
}

customElements.define('file-browser', FileBrowser);

const testData: ITreeNode[] = [
    {type: 'folder', name: 'Documents', modified: new Date(), size: 0, children: [
        {type: 'folder', name: 'Something', modified: new Date(), size: 0, children: []},
        {type: 'folder', name: 'Something else', modified: new Date(), size: 0, children: [
            {type: 'file', name: 'Description.txt', modified: new Date(), size: 1024},
            {type: 'file', name: 'Description.txt', modified: new Date(), size: 2000},
        ]},
        {type: 'file', name: 'Description.txt', modified: new Date(), size: 1},
        {type: 'file', name: 'Description.rtf', modified: new Date(), size: 2},
        {type: 'file', name: 'Description.pdf', modified: new Date(), size: 3},
    ]},
    {type: 'folder', name: 'Images', modified: new Date(), size: 0},
    {type: 'folder', name: 'System', modified: new Date(), size: 0},
    {type: 'file', name: 'Description.txt', modified: new Date(), size: 1},
    {type: 'file', name: 'Description.rtf', modified: new Date(), size: 2},
];

(window as any).FileBrowser = {
    init: (nodes?: ITreeNode[]) => new FileBrowser(nodes),
    testData
}