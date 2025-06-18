// src/store/_tests_/auth.spec.js

import { describe, it, expect, vi, beforeEach } from 'vitest';
import authModule from '../auth';

describe('Vuex auth Module', () => {
  let testState;

  beforeEach(() => {
    // Panggil state sebagai fungsi untuk mendapatkan objek state baru setiap tes
    testState = authModule.state();
  });

  // 1. TESTING MUTATIONS
  describe('mutations', () => {
    it('setUserLogin seharusnya mengisi userLogin dan isLogin', () => {
      const payload = { userData: { name: 'Test User' }, loginStatus: true };
      // Panggil mutasi melalui objek authModule
      authModule.mutations.setUserLogin(testState, payload);

      expect(testState.userLogin).toEqual(payload.userData);
      expect(testState.isLogin).toBe(true);
    });

    it('setUserLogout seharusnya mengosongkan state', () => {
      // Isi state dulu
      testState.isLogin = true;
      testState.userLogin = { name: 'Test User' };

      authModule.mutations.setUserLogout(testState);

      expect(testState.isLogin).toBe(false);
      expect(testState.userLogin).toEqual({});
      expect(testState.token).toBe(null);
    });
  });

  // 2. TESTING GETTERS
  // Getters tidak ada di auth.js Anda, jadi bagian ini bisa dihapus atau ditambahkan jika Anda membuatnya nanti.

  // 3. TESTING ACTIONS
  describe('actions', () => {
    it('addNewUser seharusnya memanggil commit setUserLogin', async () => {
      const commit = vi.fn();
      const payload = { firstname: 'Test', lastname: 'User' };
      
      // Karena action ini memanggil axios, idealnya axios di-mock.
      // Untuk sekarang, kita fokus pada pemanggilan commit.
      // Kita panggil action-nya
      await authModule.actions.addNewUser({ commit, state: testState }, payload);

      // Cek apakah commit dipanggil dengan mutasi yang benar dan payload yang sesuai
      expect(commit).toHaveBeenCalledWith('setUserLogin', { userData: payload, loginStatus: true });
    });
  });
});