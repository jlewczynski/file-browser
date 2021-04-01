export interface ITreeNode {
    type: 'file' | 'folder';
    name: string;
    modified: Date;
    size: number;
    children?: ITreeNode[]
}

export function deepCopyNode(node: ITreeNode): ITreeNode {
    return {
        ...node,
        children: node.children ? node.children.map(n => deepCopyNode(n)) : undefined
    }
}

export function getPath(root: ITreeNode, searched: ITreeNode): ITreeNode[] {
    if(searched === root)
        return [ root ];
    for(const child of (root.children ?? [])) {
        if(child.type === 'folder') {
            const path = getPath(child, searched);
            if(path.length > 0)
                return [ root, ...path ];
        }
    }
    return [];
}