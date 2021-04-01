import { deepCopyNode, ITreeNode } from './TreeNode';

class FileBrowser extends HTMLElement {
    private rootFile: ITreeNode;
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
        this.innerHTML = `
        <div class="viewer">
            <div class="left-panel">
                <div class="node selected">
                    <span class="arrow opened"> </span>
                    <div class="contains">
                        <div class="label">
                            <img src="./img/dir.png" />
                            <span class="dirname">Files</span>
                        </div>

                        <div class="node">
                            <span class="arrow closed"> </span>
                            <div class="contains">
                                <div class="label">
                                    <img src="./img/dir.png" />
                                    <span class="dirname">Documents</span>
                                </div>
                            </div>
                        </div>
                        <div class="node">
                            <span class="arrow none"> </span>
                            <div class="contains">
                                <div class="label">
                                    <img src="./img/dir.png" />
                                    <span class="dirname">Images</span>
                                </div>
                            </div>
                        </div>
                        <div class="node">
                            <span class="arrow none"> </span>
                            <div class="contains">
                                <div class="label">
                                    <img src="./img/dir.png" />
                                    <span class="dirname">System</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-panel">
                <div class="row header">
                    <div class="cell name-column">
                        <div class="icon"></div>Name
                    </div>
                    <div class="cell date-column">Date Modified</div>
                    <div class="cell size-column">File Size</div>
                </div>

                <div class="row">
                    <div class="cell name-column">
                        <img class="icon" src="./img/dir.png" />Documents
                    </div>
                    <div class="cell date-column">7/6/2020</div>
                    <div class="cell size-column"> </div>
                </div>
                <div class="row">
                    <div class="cell name-column">
                        <img class="icon" src="./img/dir.png" />Images
                    </div>
                    <div class="cell date-column">7/6/2020</div>
                    <div class="cell size-column"> </div>
                </div>
                <div class="row">
                    <div class="cell name-column">
                        <img class="icon" src="./img/dir.png" />System</div>
                    <div class="cell date-column">7/6/2020</div>
                    <div class="cell size-column"> </div>
                </div>
                <div class="row">
                    <div class="cell name-column">
                        <img class="icon" src="./img/rtf.png" />Description.rtf
                    </div>
                    <div class="cell date-column">7/6/2020</div>
                    <div class="cell size-column">1 KB</div>
                </div>
                <div class="row selected">
                    <div class="cell name-column">
                        <img class="icon" src="./img/txt.png" />Description.txt
                    </div>
                    <div class="cell date-column">7/6/2020</div>
                    <div class="cell size-column">2 KB</div>
                </div>
            </div>
        </div>`;
    }

    get files() {
        return this.rootFile.children?.map(n => deepCopyNode(n)) || [];
    }
    set files(value: ITreeNode[]) {
        this.rootFile.children = value.map(n => deepCopyNode(n));
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