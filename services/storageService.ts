import { createClient } from '@supabase/supabase-js';
import { GameCode, UpdateLog, Branding } from '../types.ts';

const SUPABASE_URL = 'https://nlphefeazlkmasmlonih.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MAEYL8xx_hi_zio4Bboyww_BUJjeS2D';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface UploadResult {
  url: string | null;
  error?: string;
}

export const storageService = {
  getBranding: async (): Promise<Branding | null> => {
    try {
      const { data, error } = await supabase.from('branding').select('*').eq('id', 1).maybeSingle();
      if (error) {
        console.error("Supabase getBranding error:", error);
        return null;
      }
      if (!data) return null;
      
      return {
        logo_url: data.logo_url,
        banner_url: data.banner_url,
        gameplay_images: Array.isArray(data.gameplay_images) ? data.gameplay_images : (data.gameplay_image_url ? [data.gameplay_image_url] : [])
      };
    } catch (err) {
      console.error("Catch getBranding error:", err);
      return null;
    }
  },

  saveBranding: async (branding: Branding): Promise<boolean> => {
    try {
      // First, attempt to save using all possible column formats to handle schema variations
      const payload: any = {
        id: 1,
        logo_url: branding.logo_url,
        banner_url: branding.banner_url,
        gameplay_image_url: branding.gameplay_images[0] || '',
        gameplay_images: branding.gameplay_images
      };

      const { error } = await supabase.from('branding').upsert(payload, { onConflict: 'id' });
      
      if (error) {
        console.error("Supabase primary save attempt failed:", error);
        
        // Fallback: If 'gameplay_images' column is missing, try saving without it
        if (error.message?.includes('column "gameplay_images" does not exist')) {
            const fallbackPayload = { ...payload };
            delete fallbackPayload.gameplay_images;
            const { error: fallbackError } = await supabase.from('branding').upsert(fallbackPayload, { onConflict: 'id' });
            if (!fallbackError) return true;
            console.error("Fallback save also failed:", fallbackError);
        }
        return false;
      }
      return true;
    } catch (err) {
      console.error("Critical error in saveBranding:", err);
      return false;
    }
  },

  uploadFile: async (file: File, prefix: string): Promise<UploadResult> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('game-assets')
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return { url: null, error: uploadError.message };
      }

      const { data: urlData } = supabase.storage
        .from('game-assets')
        .getPublicUrl(fileName);

      return { url: urlData.publicUrl };
    } catch (err) {
      console.error("Catch upload error:", err);
      return { url: null, error: 'UNKNOWN_ERROR' };
    }
  },

  getCodes: async (): Promise<GameCode[]> => {
    try {
      const { data, error } = await supabase
        .from('codes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Supabase getCodes error:", error);
        return [];
      }
      return data.map((item: any) => ({
        id: item.id,
        code: item.code,
        reward: item.reward,
        isNew: item.is_new,
        active: item.active
      }));
    } catch { return []; }
  },

  saveCode: async (code: Partial<GameCode>) => {
    try {
      const { error } = await supabase.from('codes').insert([{
        code: code.code,
        reward: code.reward,
        is_new: true,
        active: true
      }]);
      if (error) console.error("Supabase saveCode error:", error);
      return !error;
    } catch { return false; }
  },

  deleteCode: async (id: string) => {
    try {
      const { error } = await supabase.from('codes').delete().eq('id', id);
      return !error;
    } catch { return false; }
  },

  getLogs: async (): Promise<UpdateLog[]> => {
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('date', { ascending: false });
      if (error) return [];
      return data;
    } catch { return []; }
  },

  saveLog: async (log: Partial<UpdateLog>) => {
    try {
      const { error } = await supabase.from('logs').insert([{
        title: log.title,
        content: log.content,
        date: new Date().toISOString().split('T')[0]
      }]);
      return !error;
    } catch { return false; }
  },

  deleteLog: async (id: string) => {
    try {
      const { error } = await supabase.from('logs').delete().eq('id', id);
      return !error;
    } catch { return false; }
  }
};