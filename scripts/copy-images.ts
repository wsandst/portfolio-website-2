/**
 * Prebuild script to copy over content images to
 * the public directory, to allow them to be served by NextJS.
 * This is useful to easier group markdown with their respective images.
 * TODO: Add blog posts as well
 */
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const fsPromises = fs.promises;
const targetDir = './public/assets/projects';
const postsDir = './content/project';

// Copy over images for a specific slug to public
async function copyImagesToPublic(images, slug) {
    for (const image of images) {
        await fsPromises.copyFile(
            `${postsDir}/${slug}/${image}`,
            `${targetDir}/${slug}/${image}`
        );
    }
}

// Copy over images to public/assets
const copyImages = async () => {
    await fsExtra.emptyDir(targetDir);

    // Get every post folder: post-one, post-two etc.
    const postSlugs = await fsPromises.readdir(postsDir);

    for (const slug of postSlugs) {
        const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    
        // Read all files inside current post folder
        const postDirFiles = await fsPromises.readdir(`${postsDir}/${slug}`);
    
        // Filter out files with allowed file extension (images)
        const images = postDirFiles.filter(file =>
            allowedImageFileExtensions.includes(path.extname(file)),
        );
    
        if (images.length) {
        // Create a folder for images of this post inside public
        await fsPromises.mkdir(`${targetDir}/${slug}`);
    
        await copyImagesToPublic(images, slug);
        }
    }
};

copyImages();