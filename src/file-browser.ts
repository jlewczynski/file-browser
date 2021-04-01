class FileBrowser extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div>Hello, World!</div>`;
    }
}

customElements.define('file-browser', FileBrowser);

(window as any).FileBrowser = {
    init: () => new FileBrowser()
}