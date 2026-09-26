import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSiteInfo() {
    return {
      phone: process.env.SITE_PHONE ?? '+256 700 123 456',
      email: process.env.SITE_EMAIL ?? 'info@glorychildrenministry.com',
      location: process.env.SITE_LOCATION ?? 'Kampala, Uganda',
      social: {
        x: process.env.SOCIAL_X ?? 'https://x.com/',
        facebook: process.env.SOCIAL_FACEBOOK ?? 'https://facebook.com/',
        whatsapp: process.env.SOCIAL_WHATSAPP ?? 'https://wa.me/',
        tiktok: process.env.SOCIAL_TIKTOK ?? 'https://tiktok.com/',
        linkedin: process.env.SOCIAL_LINKEDIN ?? 'https://linkedin.com/',
      },
    };
  }
}
