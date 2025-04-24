# Gallery Photos

This directory contains all images that will be displayed in the gallery section of the website.

## How it works

When you add, modify, or delete images in this directory:

1. The GitHub Action workflow will automatically run
2. It will generate a `photos-list.json` file in the root of the repository
3. The website will use this JSON file to dynamically load gallery images

## Supported file types

- JPG/JPEG
- PNG
- GIF
- WebP

## File naming

You can use any naming convention, but it's recommended to:
- Use lowercase names
- Replace spaces with hyphens or underscores
- Include descriptive names for better SEO 