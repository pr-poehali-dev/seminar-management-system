import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Seminar, User, City, Role, DatabaseData } from '@/types/seminar';

interface SeminarState {
  seminars: Seminar[];
  users: User[];
  cities: City[];
  roles: Role[];
  filteredSeminars: Seminar[];
  loading: boolean;
  error: string | null;
  currentType: 'application' | 'upcoming' | 'history';
  searchQuery: string;
  page: number;
  rowsPerPage: number;
  selectedIds: number[];
}

const initialState: SeminarState = {
  seminars: [],
  users: [],
  cities: [],
  roles: [],
  filteredSeminars: [],
  loading: false,
  error: null,
  currentType: 'upcoming',
  searchQuery: '',
  page: 0,
  rowsPerPage: 10,
  selectedIds: [],
};

export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async () => {
    const response = await fetch('/db.json');
    const data = await response.json() as DatabaseData;
    return data;
  }
);

export const deleteSeminars = createAsyncThunk(
  'seminars/deleteSeminars',
  async (ids: number[]) => {
    return ids;
  }
);

const seminarSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: {
    setCurrentType: (state, action: PayloadAction<'application' | 'upcoming' | 'history'>) => {
      state.currentType = action.payload;
      state.page = 0;
      state.selectedIds = [];
      applyFilters(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0;
      applyFilters(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    toggleSelectSeminar: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(selectedId => selectedId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeminars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeminars.fulfilled, (state, action) => {
        state.loading = false;
        state.seminars = action.payload.seminars;
        state.users = action.payload.users;
        state.cities = action.payload.cities;
        state.roles = action.payload.roles;
        applyFilters(state);
      })
      .addCase(fetchSeminars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch seminars';
      })
      .addCase(deleteSeminars.fulfilled, (state, action) => {
        state.seminars = state.seminars.filter(
          seminar => !action.payload.includes(seminar.id)
        );
        state.selectedIds = [];
        applyFilters(state);
      });
  },
});

function applyFilters(state: SeminarState) {
  let filtered = state.seminars.filter(
    seminar => seminar.status === state.currentType
  );

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      seminar => {
        const user = state.users.find(u => u.id === seminar.userId);
        return (
          seminar.title.toLowerCase().includes(query) ||
          seminar.description.toLowerCase().includes(query) ||
          (user && user.fullName.toLowerCase().includes(query))
        );
      }
    );
  }

  state.filteredSeminars = filtered;
}

export const {
  setCurrentType,
  setSearchQuery,
  setPage,
  setRowsPerPage,
  toggleSelectSeminar,
  clearSelection,
} = seminarSlice.actions;

export default seminarSlice.reducer;
