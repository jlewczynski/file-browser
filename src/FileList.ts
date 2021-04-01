import { ITreeNode } from "./TreeNode";

export class FileList extends HTMLElement {
    private fileNodes: ITreeNode[];

    constructor(files?: ITreeNode[]) {
        super();
        this.fileNodes = files || [];
    }

    connectedCallback() {
        this.innerHTML =
            `<div class="right-panel">
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
            </div>`;
    }

    set files(value: ITreeNode[]) {
        this.fileNodes = value;
    }
}

customElements.define('file-list', FileList);