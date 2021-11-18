// The imported methods will use the File System
// Access API or a fallback implementation.
import {
    fileOpen,
    directoryOpen,
    fileSave,
    supported,
} from 'browser-fs-access';

(async () => {
    if (supported) {
        console.log('Using the File System Access API.');
    } else {
        console.log('Using the fallback implementation.');
    }

    // Open a file.
    const blob = await fileOpen({
        mimeTypes: ['image/*'],
    });

    // Open multiple files.
    const blobs = await fileOpen({
        mimeTypes: ['image/*'],
        multiple: true,
    });

    // Open files of different MIME types.
    const blobs2 = await fileOpen([
        {
            description: 'Image files',
            mimeTypes: ['image/jpg', 'image/png', 'image/gif', 'image/webp'],
            extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
            multiple: true,
        },
        {
            description: 'Text files',
            mimeTypes: ['text/*'],
            extensions: ['.txt'],
        },
    ]);

    // Open all files in a directory,
    // recursively including subdirectories.
    const blobsInDirectory = await directoryOpen({
        recursive: true,
    });

    // Save a file.
    await fileSave(blob, {
        fileName: 'Untitled.png',
        extensions: ['.png'],
    });
})();
