export default function FileHandler({ url }) {
    return isImage(url) ? <img src={url} width={400} height={400} /> : <a href={url} target="_blank" download>Click to download</a>
}

function isImage(url) {
    // Define common image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

    // Extract file extension from URL
    const extension = url.split('.').pop().toLowerCase();

    // Check if the extension is in the list of image extensions
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
}