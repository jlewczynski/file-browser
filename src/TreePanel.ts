import { ITreeNode } from "./TreeNode";

export class TreePanel extends HTMLElement {
    private fileNode: ITreeNode;

    constructor(rootFile: ITreeNode) {
        super();
        this.fileNode = rootFile;
    }

    connectedCallback() {
        this.innerHTML = `
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
        </div>`;
    }

    set rootFile(value: ITreeNode) {
        this.fileNode = value;
    }
}

customElements.define('tree-panel', TreePanel);
