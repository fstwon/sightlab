// 이미지 보관소 (Vercel Blob). Notion 파일 주소는 1시간 뒤 만료되므로 빌드 때 복사해 둔다 (D4-5).
export type { AssetFolder } from './asset-pathname';
export { copyToAssetStorage } from './copy-to-asset-storage';
