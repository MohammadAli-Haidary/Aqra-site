/**
 * API Service
 * ارتباط با Backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطای سرور');
    }

    return data;
  }

  // Auth
  async login(username: string, password: string) {
    const data = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.token = data.data.token;
    if (this.token) {
      localStorage.setItem('admin_token', this.token);
    }
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  // Books
  async getBooks(params?: { category?: string; badge?: string; search?: string }) {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return this.request<any>(`/books${query}`);
  }

  async getBook(id: number) {
    return this.request<any>(`/books/${id}`);
  }

  async createBook(bookData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers,
      body: bookData,
    });
    return response.json();
  }

  async updateBook(id: number, bookData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers,
      body: bookData,
    });
    return response.json();
  }

  async deleteBook(id: number) {
    return this.request<any>(`/books/${id}`, { method: 'DELETE' });
  }

  // Gallery
  async getGallery(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any>(`/gallery${query}`);
  }

  async createGallery(galleryData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers,
      body: galleryData,
    });
    return response.json();
  }

  async updateGallery(id: number, galleryData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers,
      body: galleryData,
    });
    return response.json();
  }

  async deleteGallery(id: number) {
    return this.request<any>(`/gallery/${id}`, { method: 'DELETE' });
  }

  // Categories
  async getCategories() {
    return this.request<any>('/categories');
  }

  async createCategory(data: any) {
    return this.request<any>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: number, data: any) {
    return this.request<any>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number) {
    return this.request<any>(`/categories/${id}`, { method: 'DELETE' });
  }

  // Testimonials
  async getTestimonials() {
    return this.request<any>('/testimonials');
  }

  async submitTestimonial(data: any) {
    return this.request<any>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Contact
  async submitContact(data: any) {
    return this.request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Newsletter
  async subscribe(email: string, name?: string) {
    return this.request<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  // Settings
  async getSettings() {
    return this.request<any>('/settings');
  }

  async getStats() {
    return this.request<any>('/settings/dashboard/stats');
  }
}

export const apiService = new ApiService();
export default apiService;
