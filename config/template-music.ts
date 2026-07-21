export interface TemplateMusic {
  themeId: string;
  title: string;
  artist: string;
  file: string;
}

// No template music - only custom uploads
export const TEMPLATE_MUSIC: Record<string, TemplateMusic> = {};

// Music library removed - only custom uploads supported
export const MUSIC_LIBRARY: TemplateMusic[] = [];

export function getTemplateMusic(themeId: string): TemplateMusic {
  return {
    themeId,
    title: "Upload Musik Custom",
    artist: "Your Music",
    file: "", // Empty - requires custom upload
  };
}
