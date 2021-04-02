export interface ITreeNode {
    type: 'file' | 'folder';
    name: string;
    modified: Date;
    size: number;
    children?: ITreeNode[]
}

/**
 * Searches for a given child node in the parent node. The result is an array
 * that represents subsequent nodes from the root which need to be traversed
 * to reach the searched node.
 *
 * If the searched node is not a descendent of the root than an empty array
 * is returned.
 *
 * @param root root node to search through
 * @param searched searched node
 * @returns array of path nodes
 */
export function getPath(root: ITreeNode, searched: ITreeNode): ITreeNode[] {
    if (searched === root)
        return [root];
    for (const child of (root.children ?? [])) {
        if (child.type === 'folder') {
            const path = getPath(child, searched);
            if (path.length > 0)
                return [root, ...path];
        }
    }
    return [];
}