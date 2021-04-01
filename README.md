# File browser #

File browser panel with a tree panel for Cribl recruitment process.

## Requirements ##

* Use a pure JavaScript/TypeScript without any dependencies such as React, Vue, Angular etc.
* Component should be divided into two panes and display a folder tree in the left pane and a file/folder list in the right pane (see mockup).
* It should be possible to expand/collapse folders in the folder tree.
* It should be possible to select on a folder in the left or right pane and display the contents of the folder in the right pane.
* It should be possible to do the following via public API:
    * get/set a list of nodes in the following format:

            interface ITreeNode {
                type: 'file' | 'folder';
                name: string;
                modified: Date;
                size: number;
                children?: ITreeNode[]
            }

    * get/set a selected folder
    * detect when a folder is selected
