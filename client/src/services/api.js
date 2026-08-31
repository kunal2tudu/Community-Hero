// Client API Service for Community Hero

const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Issues
  async getIssues(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/issues?${query}`);
    return res.json();
  },

  async getIssueById(id) {
    const res = await fetch(`${API_BASE}/issues/${id}`);
    return res.json();
  },

  async createIssue(issueData) {
    const res = await fetch(`${API_BASE}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData)
    });
    return res.json();
  },

  async verifyIssue(id) {
    const res = await fetch(`${API_BASE}/issues/${id}/verify`, {
      method: 'POST'
    });
    return res.json();
  },

  async addComment(id, text) {
    const res = await fetch(`${API_BASE}/issues/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return res.json();
  },

  async updateStatus(id, updateData) {
    const res = await fetch(`${API_BASE}/issues/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return res.json();
  },

  // AI Engine
  async runAiTriage(data) {
    const res = await fetch(`${API_BASE}/ai/triage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getAiPredictions() {
    const res = await fetch(`${API_BASE}/ai/predictions`);
    return res.json();
  },

  // Analytics
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/analytics`);
    return res.json();
  },

  // Hero Gamification & User
  async getCurrentUser() {
    const res = await fetch(`${API_BASE}/heroes/me`);
    return res.json();
  },

  async getLeaderboard() {
    const res = await fetch(`${API_BASE}/heroes/leaderboard`);
    return res.json();
  },

  async getPerks() {
    const res = await fetch(`${API_BASE}/heroes/perks`);
    return res.json();
  },

  async redeemPerk(id) {
    const res = await fetch(`${API_BASE}/heroes/perks/${id}/redeem`, {
      method: 'POST'
    });
    return res.json();
  },

  // AI Chat Assistant
  async sendChatMessage(message) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return res.json();
  }
};
