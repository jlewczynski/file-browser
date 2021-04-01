import { ITreeNode } from "./TreeNode";

type NodeSelectEventDetails = {
    entry: ITreeNode;
    open?: boolean;
}

export class NodeSelectEvent extends CustomEvent<NodeSelectEventDetails> {
    constructor(entry: ITreeNode, open?: boolean) {
        super('nodeselect', { bubbles: true, detail: { entry, open } });
    }
}
