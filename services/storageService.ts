
import { createClient } from '@supabase/supabase-js';
import { GameCode, UpdateLog, Branding } from '../types';

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
        console.error('Branding fetch error:', error.message);
        return null;
      }
      if (!data) return null;
      
      return {
        logo_url: data.logo_url,
        banner_url: data.banner_url,
        gameplay_images: Array.isArray(data.gameplay_images) ? data.gameplay_images : (data.gameplay_image_url ? [data.gameplay_image_url] : [])
      };
    } catch (e) {
      console.error('Unexpected error fetching branding:', e);
      return null;
    }
  },

  saveBranding: async (branding: Branding): Promise<boolean> => {
    try {
      const { error } = await supabase.from('branding').upsert({
        id: 1,
        logo_url: branding.logo_url,
        banner_url: branding.banner_url,
        gameplay_images: branding.gameplay_images,
        // Keep the old field for backwards compatibility if needed
        gameplay_image_url: branding.gameplay_images[0] || ''
      }, { onConflict: 'id' });
      
      if (error) {
        console.error('Supabase Save Error:', error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error saving branding:', e);
      return false;
    }
  },

  uploadFile: async (file: File, prefix: string): Promise<UploadResult> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = fileName;

      const { data, error: uploadError } = await supabase.storage
        .from('game-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        return { 
          url: null, 
          error: uploadError.message.includes('not found') ? 'BUCKET_NOT_FOUND' : uploadError.message 
        };
      }

      const { data: urlData } = supabase.storage
        .from('game-assets')
        .getPublicUrl(filePath);

      return { url: urlData.publicUrl };
    } catch (e) {
      return { url: null, error: 'UNKNOWN_ERROR' };
    }
  },

  getCodes: async (): Promise<GameCode[]> => {
    try {
      const { data, error } = await supabase
        .from('codes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) return [];
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
