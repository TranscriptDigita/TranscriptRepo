import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transAuthService from './transAuthService';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  degreeType: null,
  faculty: null,
  department: null,
  matricNumber: null,
  yearOfGraduation: null,
  program: null,
};

export const fetchDegreeType = createAsyncThunk(
  'transAuth/fetchDegreeType',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchDegreeType(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for faculty
export const fetchFaculty = createAsyncThunk(
  'transAuth/fetchFaculty',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchFaculty(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for department
export const fetchDepartment = createAsyncThunk(
  'transAuth/fetchDepartment',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchDepartment(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for matricNumber
export const fetchMatricNumber = createAsyncThunk(
  'transAuth/fetchMatricNumber',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchMatricNumber(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for yearOfGraduation
export const fetchYearOfGraduation = createAsyncThunk(
  'transAuth/fetchYearOfGraduation',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchYearOfGraduation(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for program
export const fetchProgram = createAsyncThunk(
  'transAuth/fetchProgram',
  async (userData, thunkAPI) => {
    try {
      const response = await transAuthService.fetchProgram(userData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.message ||
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const transAuthSlice = createSlice({
  name: 'transAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.degreeType = null;
      state.faculty = null;
      state.department = null;
      state.matricNumber = null;
      state.yearOfGraduation = null;
      state.program = null;
    },
  },
  extraReducers: (builder) => {
    builder

        // Degree
      .addCase(fetchDegreeType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDegreeType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.degreeType = action.payload;
      })
      .addCase(fetchDegreeType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

   // Faculty
   .addCase(fetchFaculty.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchFaculty.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.faculty = action.payload;
  })
  .addCase(fetchFaculty.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  });

  // Department
  .addCase(fetchDepartment.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchDepartment.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.department = action.payload;
  })
  .addCase(fetchDepartment.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  });

  // Matric Number
  .addCase(fetchMatricNumber.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchMatricNumber.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.matricNumber = action.payload;
  })
  .addCase(fetchMatricNumber.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  });

  // Year of Graduation
  .addCase(fetchYearOfGraduation.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchYearOfGraduation.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.yearOfGraduation = action.payload;
  })
  .addCase(fetchYearOfGraduation.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  });

  // Program
  .addCase(fetchProgram.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchProgram.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.program = action.payload;
  })
  .addCase(fetchProgram.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  });
},
});

export const { reset } = transAuthSlice.actions;

export default transAuthSlice.reducer;
