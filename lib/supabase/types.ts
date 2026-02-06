export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'admin' | 'alumni' | 'public';
export type StoryStatus = 'draft' | 'pending' | 'published' | 'rejected';
export type StoryCategory = 'karir' | 'pengabdian' | 'akademik' | 'kepemimpinan';
export type ManagementRole = 'pengurus_inti' | 'ketua_angkatan';
export type TestimonialType = 'ketua_angkatan' | 'tokoh_ternama';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          angkatan: number | null;
          photo: string | null;
          role: UserRole;
          bio: string | null;
          job_title: string | null;
          company: string | null;
          location: string | null;
          phone: string | null;
          linkedin: string | null;
          instagram: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          angkatan?: number | null;
          photo?: string | null;
          role?: UserRole;
          bio?: string | null;
          job_title?: string | null;
          company?: string | null;
          location?: string | null;
          phone?: string | null;
          linkedin?: string | null;
          instagram?: string | null;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      stories: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          hero_image: string | null;
          category: StoryCategory;
          tags: string[] | null;
          status: StoryStatus;
          featured: boolean;
          read_time: string | null;
          views: number;
          published_at: string | null;
          rejected_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          hero_image?: string | null;
          category: StoryCategory;
          tags?: string[] | null;
          status?: StoryStatus;
          featured?: boolean;
          read_time?: string | null;
        };
        Update: Partial<Database['public']['Tables']['stories']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          content: string | null;
          date: string;
          time: string | null;
          end_date: string | null;
          location: string | null;
          category: string | null;
          image_url: string | null;
          is_live: boolean;
          is_featured: boolean;
          capacity: number | null;
          organizer_id: string | null;
          registration_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          date: string;
          time?: string | null;
          end_date?: string | null;
          location?: string | null;
          category?: string | null;
          image_url?: string | null;
          is_live?: boolean;
          is_featured?: boolean;
          capacity?: number | null;
          organizer_id?: string | null;
          registration_url?: string | null;
        };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: string;
          registered_at: string;
        };
        Insert: {
          event_id: string;
          user_id: string;
          status?: string;
        };
        Update: Partial<Database['public']['Tables']['event_registrations']['Insert']>;
      };
      batches: {
        Row: {
          id: number;
          angkatan: number;
          year: string;
          fun_fact: string | null;
          created_at: string;
        };
        Insert: {
          angkatan: number;
          year: string;
          fun_fact?: string | null;
        };
        Update: Partial<Database['public']['Tables']['batches']['Insert']>;
      };
      batch_leaders: {
        Row: {
          id: string;
          batch_id: number;
          profile_id: string | null;
          name: string;
          photo: string | null;
          quote: string | null;
          job_title: string | null;
          is_ketua: boolean;
          created_at: string;
        };
        Insert: {
          batch_id: number;
          profile_id?: string | null;
          name: string;
          photo?: string | null;
          quote?: string | null;
          job_title?: string | null;
          is_ketua?: boolean;
        };
        Update: Partial<Database['public']['Tables']['batch_leaders']['Insert']>;
      };
      clusters: {
        Row: {
          id: string;
          name: string;
          short_name: string;
          description: string | null;
          icon: string | null;
          color: 'red' | 'blue' | 'yellow' | null;
          order_index: number | null;
          created_at: string;
        };
        Insert: {
          name: string;
          short_name: string;
          description?: string | null;
          icon?: string | null;
          color?: 'red' | 'blue' | 'yellow' | null;
          order_index?: number | null;
        };
        Update: Partial<Database['public']['Tables']['clusters']['Insert']>;
      };
      management: {
        Row: {
          id: string;
          profile_id: string | null;
          name: string;
          position: string;
          angkatan: string | null;
          photo: string | null;
          role: ManagementRole;
          instagram: string | null;
          linkedin: string | null;
          order_index: number | null;
          created_at: string;
        };
        Insert: {
          profile_id?: string | null;
          name: string;
          position: string;
          angkatan?: string | null;
          photo?: string | null;
          role: ManagementRole;
          instagram?: string | null;
          linkedin?: string | null;
          order_index?: number | null;
        };
        Update: Partial<Database['public']['Tables']['management']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          profile_id: string | null;
          name: string;
          title: string;
          angkatan: string | null;
          photo: string | null;
          quote: string;
          type: TestimonialType;
          order_index: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          profile_id?: string | null;
          name: string;
          title: string;
          angkatan?: string | null;
          photo?: string | null;
          quote: string;
          type: TestimonialType;
          order_index?: number | null;
          is_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      hero_slides: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image_url: string;
          link_url: string | null;
          order_index: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          title: string;
          subtitle?: string | null;
          image_url: string;
          link_url?: string | null;
          order_index?: number | null;
          is_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['hero_slides']['Insert']>;
      };
      dormitories: {
        Row: {
          id: string;
          name: string;
          city: string;
          province: string | null;
          image_url: string | null;
          total_rooms: number | null;
          occupied_rooms: number | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          city: string;
          province?: string | null;
          image_url?: string | null;
          total_rooms?: number | null;
          occupied_rooms?: number | null;
          description?: string | null;
        };
        Update: Partial<Database['public']['Tables']['dormitories']['Insert']>;
      };
      activities: {
        Row: {
          id: string;
          category: string;
          author: string | null;
          title: string;
          subtitle: string | null;
          date: string | null;
          read_time: string | null;
          likes: number;
          comments: number;
          image_url: string | null;
          link: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          category: string;
          author?: string | null;
          title: string;
          subtitle?: string | null;
          date?: string | null;
          read_time?: string | null;
          likes?: number;
          comments?: number;
          image_url?: string | null;
          link?: string | null;
          is_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
    };
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Story = Database['public']['Tables']['stories']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type EventRegistration = Database['public']['Tables']['event_registrations']['Row'];
export type Batch = Database['public']['Tables']['batches']['Row'];
export type BatchLeader = Database['public']['Tables']['batch_leaders']['Row'];
export type Cluster = Database['public']['Tables']['clusters']['Row'];
export type Management = Database['public']['Tables']['management']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type HeroSlide = Database['public']['Tables']['hero_slides']['Row'];
export type Dormitory = Database['public']['Tables']['dormitories']['Row'];
export type Activity = Database['public']['Tables']['activities']['Row'];

// Story with author
export type StoryWithAuthor = Story & {
  author: Profile;
};
