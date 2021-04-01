import { FileList } from './FileList';
import { deepCopyNode, ITreeNode } from './TreeNode';
import { TreePanel } from './TreePanel';

class FileBrowser extends HTMLElement {

    private rootFile: ITreeNode;
    private rendered = false;

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

        const treePanel = new TreePanel(this.rootFile);
        this.appendChild(treePanel);

        const fileList = new FileList(this.rootFile.children || []);
        this.appendChild(fileList);

        this.rendered = true;
    }

    get files() {
        return this.rootFile.children?.map(n => deepCopyNode(n)) || [];
    }
    set files(value: ITreeNode[]) {
        this.rootFile.children = value.map(n => deepCopyNode(n));
        //update sub-panels
        if(this.rendered) {
            const treePanel = this.getElementsByTagName('tree-panel').item(0) as TreePanel;
            treePanel.rootFile = this.rootFile;
            const fileList = this.getElementsByTagName('file-list').item(0) as FileList;
            fileList.files = this.rootFile.children || [];
        }
    }
}

customElements.define('file-browser', FileBrowser);

const testData: ITreeNode[] = [
    {type: 'folder', name: 'Documents', modified: new Date(), size: 0, children: [
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