/** Figma デザインファイルの design URL ベース（node-id はストーリーごとに付与） */
export const FIGMA_DESIGN_DATA_FILE_BASE =
  "https://www.figma.com/design/REPLACE_WITH_FILE_KEY/DesignFile"

export function figmaDesignDataUrl(nodeId: string): string {
  const encoded = encodeURIComponent(nodeId.replace(/:/g, "-"))
  return `${FIGMA_DESIGN_DATA_FILE_BASE}?m=dev&node-id=${encoded}`
}
