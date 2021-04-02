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

## Solution ##

The two panel control allows to select a directory from the tree on the left
pane, which updates the right pane view to the selected folder.

On the right pane you can oopen a directory by double clicking it.

The control can be created with the constructor `new FileBrowser(nodes)`, which takes
an optional node list, or with a `<file-browser>` tag.

In the latter case you need to pass the list of file nodes with JavaScript.

The control provides the following properties:

* `files` - gets and sets the files in the root node,
* `selected` - gets and sets the selected folder. When setting, if the passed node
    is not a folder or it's not in the tree an `Error` is thrown.

To watch for changes in directories you can listen on a custom event `nodeselect`,
which provides the selected node in the `event.detail.entry` property.
