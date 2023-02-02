import copy from "copy-to-clipboard";

export const getImageURL = (collectionId, recordId, fileName, size = "0x0") => {
    return `https://tinkling-byte.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const copyUrl = (target) => {
    copy(target);
    // alert('copied')
}
