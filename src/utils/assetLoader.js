const projectImages = import.meta.glob('/src/assets/projects/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });
const iconFiles = import.meta.glob('/src/assets/icons/*.svg', { eager: true, query: '?url', import: 'default' });
const assetFiles = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

export function getProjectMedia(mediaPath) {
  if (!mediaPath) return [];
  const folder = mediaPath.replace(/^projects\//, '').replace(/\/\*\*$/, '').replace(/\/$/, '');
  const prefix = `/src/assets/projects/${folder}/`;
  return Object.entries(projectImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

export function getIconUrl(iconName) {
  const match = Object.entries(iconFiles).find(([path]) => path.endsWith(`/${iconName}`));
  return match ? match[1] : '';
}

export function getAssetUrl(assetPath) {
  const match = Object.entries(assetFiles).find(([path]) => path.endsWith(`/assets/${assetPath}`));
  return match ? match[1] : '';
}
