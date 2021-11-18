import {fileOpen} from "browser-fs-access";

export async function openFile() {
    const blobs = await fileOpen({
        // List of allowed MIME types, defaults to `*/*`.
        mimeTypes: ['image/*'],
        // List of allowed file extensions (with leading '.'), defaults to `''`.
        extensions: ['.png', '.jpg', '.jpeg', '.webp'],
        // Set to `true` for allowing multiple files, defaults to `false`.
        multiple: true,
        // Textual description for file dialog , defaults to `''`.
        description: 'Image files',
        // Suggested directory in which the file picker opens. A well-known directory or a file handle.
        startIn: 'downloads',
        // By specifying an ID, the user agent can remember different directories for different IDs.
        id: 'projects',
        // Include an option to not apply any filter in the file picker, defaults to `false`.
        excludeAcceptAllOption: true,

    });

    console.log({blobs})
}