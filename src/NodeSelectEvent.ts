import { ITreeNode } from "./TreeNode";

type NodeSelectEventDetails = {
    entry: ITreeNode;
    open?: boolean;
}
/**
 * Custom event to dispatch information about node selection.
 *
 * The event bubbles.
 */
export class NodeSelectEvent extends CustomEvent<NodeSelectEventDetails> {
    /**
     * @param entry selected node
     * @param open was the event triggered by a double click
     */
    constructor(entry: ITreeNode, open?: boolean) {
        super('nodeselect', { bubbles: true, detail: { entry, open } });
    }
}
