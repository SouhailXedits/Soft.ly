export interface DataCountry {
  country: {
    name: string;
    clicks: number;
    id: number;
  };
}



export type QrRowProps = {
  qr: {
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
  };
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

