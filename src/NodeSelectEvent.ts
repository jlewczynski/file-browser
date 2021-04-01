import { ITreeNode } from "./TreeNode";

type NodeSelectEventDetails = {
    entry: ITreeNode;
}

export class NodeSelectEvent extends CustomEvent<NodeSelectEventDetails> {
    constructor(entry: ITreeNode) {
        super('nodeselect', { bubbles: true, detail: { entry } });
    }
}
