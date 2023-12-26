export interface LoginResult {
  token: string;
}

export interface ValidateTokenResult {
  validateToken: {
    id: string;
    role: string;
    email: string;
  };
}

export interface UrlData {
  id: number;
  created_at: string;
  longUrl: string;
  shortUrl: string;
  title: string;
  qr_image_url: string;
  iconFilePath: string;
  user_id: string;
}

export interface ApiResponse {
  getUrlsWithUserId: UrlData[];
}

export interface CopyToClipboardButtonProps {
  text: string;
}


export interface DataCountry {
  country: {
    name: string;
    clicks: number;
    id: number;
  };
}


export interface LoginFormValues {
  email: string;
  password: string;
}

export interface getShorterUrlParams {
  url: string;
  title: string;
  userId: string;
  back_half: string;
}

export type QrRowProps = {
  qr: {
    id: number;
    created_at: string;
    longUrl: string;
    shortUrl: string;
    title: string;
    qr_image_url: string;
    iconFilePath: string;
    user_id: string;
  };
};

export type shortenedUrlProps = {
  link: {
    id: number;
    created_at: string;
    longUrl: string;
    shortUrl: string;
    title: string;
    iconFilePath: string;
  };
  isSelected: boolean;
  onSelect: (id: number) => void;
};


export type PieChartCompProps = {
  data: {
    name: string;
    value: number;
    id: number;
    color: string;
  }[];
};

export type BarChartCompProps = {
  data: {
    id: number;
    name: string;
    value: number;
  }[];
};

