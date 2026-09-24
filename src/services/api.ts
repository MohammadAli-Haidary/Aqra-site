/**
 * API Service
 * ارتباط با Backend API - MongoDB
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  private getHeaders(includeContentType = true): HeadersInit {
    const headers: HeadersInit = {};
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('خطا در اتصال به سرور');
    }
  }

  // ============ Auth ============
  
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

  async getMe() {
    return this.request<any>('/auth/me');
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<any>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ============ Books ============
  
  async getBooks(params?: { category?: string; badge?: string; search?: string }) {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return this.request<any>(`/books${query}`);
  }

  async getBestsellers() {
    return this.request<any>('/books/filter/bestsellers');
  }

  async getNewArrivals() {
    return this.request<any>('/books/filter/new-arrivals');
  }

  async getBook(id: string) {
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

  async updateBook(id: string, bookData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers,
      body: bookData,
    });
    return response.json();
  }

  async deleteBook(id: string) {
    return this.request<any>(`/books/${id}`, { method: 'DELETE' });
  }

  // ============ Gallery ============
  
  async getGallery(category?: string) {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return this.request<any>(`/gallery${query}`);
  }

  async getGalleryCategories() {
    return this.request<any>('/gallery/categories');
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

  async updateGallery(id: string, galleryData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers,
      body: galleryData,
    });
    return response.json();
  }

  async deleteGallery(id: string) {
    return this.request<any>(`/gallery/${id}`, { method: 'DELETE' });
  }

  // ============ Categories ============
  
  async getCategories() {
    return this.request<any>('/categories');
  }

  async createCategory(data: any) {
    return this.request<any>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: any) {
    return this.request<any>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request<any>(`/categories/${id}`, { method: 'DELETE' });
  }

  // ============ Testimonials ============
  
  async getTestimonials() {
    return this.request<any>('/testimonials');
  }

  async submitTestimonial(data: any) {
    return this.request<any>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllTestimonials() {
    return this.request<any>('/testimonials/all');
  }

  async approveTestimonial(id: string) {
    return this.request<any>(`/testimonials/${id}/approve`, { method: 'PATCH' });
  }

  async deleteTestimonial(id: string) {
    return this.request<any>(`/testimonials/${id}`, { method: 'DELETE' });
  }

  // ============ Contact ============
  
  async submitContact(data: any) {
    return this.request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMessages() {
    return this.request<any>('/contact');
  }

  async markMessageRead(id: string) {
    return this.request<any>(`/contact/${id}/read`, { method: 'PATCH' });
  }

  async deleteMessage(id: string) {
    return this.request<any>(`/contact/${id}`, { method: 'DELETE' });
  }

  // ============ Newsletter ============
  
  async subscribe(email: string, name?: string) {
    return this.request<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  async unsubscribe(email: string) {
    return this.request<any>('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getSubscribers() {
    return this.request<any>('/newsletter/subscribers');
  }

  // ============ Settings ============
  
  async getSettings() {
    return this.request<any>('/settings');
  }

  async updateSettings(settings: any) {
    return this.request<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  async getStats() {
    return this.request<any>('/settings/dashboard/stats');
  }

  // ============ Health ============
  
  async healthCheck() {
    return this.request<any>('/health');
  }
}

export const api = new ApiService();
export default api;
