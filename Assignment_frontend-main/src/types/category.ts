"use client";

export interface Category {
    _id: string;
    name: string | { [lang: string]: string | undefined };
    description?: string | { [lang: string]: string | undefined };
    icon?: string;
    status: 'active' | 'inactive' | boolean;
    children: Category[]; // Self-referencing for nested categories
    slug?: string;
    type?: string;
    parentId?: string;
    // [key: string]: any; // ONLY add this if truly necessary for dynamic properties
  }