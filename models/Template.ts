
export interface Template {
    id: number;
    name: string;
    description: string;
    site: string;
    classification: string;
    price_cents: number;
    number_of_sales: number;
    author_username: string;
    author_url: string;
    url: string;
    summary: string;
    rating: Rating;
    updated_at: Date;
    trending: boolean;
    previews: Previews;
    attributes: Attribute[];
    key_features: string[];
    image_urls: any[];
    tags: string[];
    discounts: any[];
}

export interface Rating {
    rating: number;
    count: number;
}

export interface IconWithLandscapePreview {
    icon_url: string;
    landscape_url: string;
}

export interface LiveSite {
    url: string;
}

export interface ImageUrl {
    name?: any;
    url: string;
    width: number;
    height: number;
}

export interface LandscapePreview {
    landscape_url: string;
    image_urls: ImageUrl[];
}

export interface Previews {
    icon_with_landscape_preview: IconWithLandscapePreview;
    live_site: LiveSite;
    landscape_preview: LandscapePreview;
}

export interface Attribute {
    name: string;
    value: any;
}
