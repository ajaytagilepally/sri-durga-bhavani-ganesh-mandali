export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      donations: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["donation_category"]
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string
          provider: string
          status: Database["public"]["Enums"]["donation_status"]
          utr_ref: string | null
          verified_at: string | null
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["donation_category"]
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone: string
          provider?: string
          status?: Database["public"]["Enums"]["donation_status"]
          utr_ref?: string | null
          verified_at?: string | null
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["donation_category"]
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          provider?: string
          status?: Database["public"]["Enums"]["donation_status"]
          utr_ref?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      laddu_auctions: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          name: string
          winning_amount: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          name: string
          winning_amount: number
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          name?: string
          winning_amount?: number
          year?: number
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          channel: string
          created_at: string
          id: string
          meta: Json | null
          recipient_masked: string
          status: string
          template_key: string
        }
        Insert: {
          channel: string
          created_at?: string
          id?: string
          meta?: Json | null
          recipient_masked: string
          status?: string
          template_key: string
        }
        Update: {
          channel?: string
          created_at?: string
          id?: string
          meta?: Json | null
          recipient_masked?: string
          status?: string
          template_key?: string
        }
        Relationships: []
      }
      past_donors: {
        Row: {
          amount: number | null
          created_at: string
          id: string
          is_public: boolean
          name: string
          year: number
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: string
          is_public?: boolean
          name: string
          year: number
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: string
          is_public?: boolean
          name?: string
          year?: number
        }
        Relationships: []
      }
      pooja_bookings: {
        Row: {
          address: string
          created_at: string
          gothram: string
          id: string
          name: string
          phone: string
          slot_id: string
          status: Database["public"]["Enums"]["booking_status"]
        }
        Insert: {
          address: string
          created_at?: string
          gothram: string
          id?: string
          name: string
          phone: string
          slot_id: string
          status?: Database["public"]["Enums"]["booking_status"]
        }
        Update: {
          address?: string
          created_at?: string
          gothram?: string
          id?: string
          name?: string
          phone?: string
          slot_id?: string
          status?: Database["public"]["Enums"]["booking_status"]
        }
        Relationships: [
          {
            foreignKeyName: "pooja_bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "pooja_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      pooja_slots: {
        Row: {
          capacity: number
          created_at: string
          end_time: string
          id: string
          is_blocked: boolean
          slot_date: string
          start_time: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          end_time: string
          id?: string
          is_blocked?: boolean
          slot_date: string
          start_time: string
        }
        Update: {
          capacity?: number
          created_at?: string
          end_time?: string
          id?: string
          is_blocked?: boolean
          slot_date?: string
          start_time?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin_role: { Args: { _admin_email: string }; Returns: boolean }
      create_pooja_booking: {
        Args: {
          _address: string
          _gothram: string
          _name: string
          _phone: string
          _slot_id: string
        }
        Returns: {
          booking_id: string
          end_time: string
          slot_date: string
          start_time: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
      booking_status: "confirmed" | "cancelled" | "completed"
      donation_category: "idol" | "annadanam" | "laddu_token"
      donation_status:
        | "pending"
        | "submitted"
        | "verified"
        | "failed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      booking_status: ["confirmed", "cancelled", "completed"],
      donation_category: ["idol", "annadanam", "laddu_token"],
      donation_status: [
        "pending",
        "submitted",
        "verified",
        "failed",
        "cancelled",
      ],
    },
  },
} as const
