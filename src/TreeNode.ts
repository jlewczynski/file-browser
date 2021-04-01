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