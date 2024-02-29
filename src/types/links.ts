export interface UrlData {
  id: number;
  created_at: string;
  longUrl: string;
  shortUrl: string;
  title: string;
  qr_image_url: string;
  qr_image_svg: string;
  iconFilePath: string;
  user_id: string;
  totalRequestCount: string;
}

export interface ApiResponse {
  getUrlsWithUserId: UrlData[];
}

export interface getShorterUrlParams {
  url: string;
  title: string;
  userId: string;
  back_half?: any;
  tags: any;
}
export interface updateUrlInput {
  id: string;
  title?: string;
  back_half?: string;
  tags?: any;
  longUrl?: string;
}


export interface IShortenedUrl {
  id: number;
  created_at: string;
  longUrl: string;
  shortUrl: string;
  title: string;
  iconFilePath: string;
  totalRequestCount: string;
  tags: any;
}

export type shortenedUrlProps = {
  link: IShortenedUrl;
  isSelected: boolean;
  onSelect: (id: number) => void;
};
