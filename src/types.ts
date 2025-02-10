// Asset Type
  
  export interface Asset {
    uuid: string;
    title: string;
    description: string;
    type: AssetType;
    price: string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    available_from: string;
    street: string;
    street_number: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
    type_id?: string;
  }
  
  
  // Pagination Meta Data
  export interface Pagination {
    current_page: number;
    last_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  }
  
  // API Response Type
  export interface AssetResponse {
    data: Asset[];
    meta: Pagination;
    links: {
      next: string | null;
      prev: string | null;
    };
  }

  export interface AssetType {
    uuid: string;
    name: string;
    value?: number;
  }

  export interface Filters {
    types: string[];
    amenities: string[];
    sort?: string;
    sortDesc?: boolean;
  }
  
  