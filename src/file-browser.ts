class FileBrowser extends HTMLElement {
    constructor() {
        super();
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
}

customElements.define('file-browser', FileBrowser);

(window as any).FileBrowser = {
    init: () => new FileBrowser()
}