import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Seminar } from '@/types/seminar';

interface SeminarState {
  seminars: Seminar[];
  filteredSeminars: Seminar[];
  loading: boolean;
  error: string | null;
  currentType: 'future' | 'history' | 'request';
  searchQuery: string;
  page: number;
  rowsPerPage: number;
  selectedIds: number[];
}

const initialState: SeminarState = {
  seminars: [],
  filteredSeminars: [],
  loading: false,
  error: null,
  currentType: 'future',
  searchQuery: '',
  page: 0,
  rowsPerPage: 10,
  selectedIds: [],
};

export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async () => {
    const response = await fetch('/db.json');
    const data = await response.json();
    return data.seminars as Seminar[];
  }
);

export const deleteSeminars = createAsyncThunk(
  'seminars/deleteSeminars',
  async (ids: number[], { getState }) => {
    return ids;
  }
);

const seminarSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: {
    setCurrentType: (state, action: PayloadAction<'future' | 'history' | 'request'>) => {
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
        state.seminars = action.payload;
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
    seminar => seminar.type === state.currentType
  );

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      seminar =>
        seminar.title.toLowerCase().includes(query) ||
        seminar.speaker.toLowerCase().includes(query)
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
