export class FileIcon extends HTMLElement {
    private ext: string;
    constructor(ext: string) {
        super();
        this.ext = ext;
    }

    connectedCallback() {
        this.style.position = 'relative';
        this.innerHTML = `
        <div style="display: inline-block; width: 8px; height: 14px; border: 3px solid #333333; margin: 6px 9px"></div>
        <div style="position: absolute; background-color: white; color: #333333; font-size: 10px; right: 11px; top: 11px; height: 10px; line-height: 10px">
        ${this.ext}
        </div>`;
    }
}

customElements.define('file-icon', FileIcon);