import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import institutionService from '../auth/institutionService';

//  Retrieve the 'user' data from local storage
const institution = JSON.parse(localStorage.getItem('institution'));

const initialState = {
  institution: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  //  Initialize 'user' based on the data retrieved from local storage
  institutionUser: institution ? institution : null,
};


export const registerInstitution = createAsyncThunk(
  'institution/register',
  async (institutionData, thunkAPI) => {
    try {
      return await institutionService.registerInstitution(institutionData);
    } catch (error) {
      const message =
        error.response?.data.message ||
        error.response?.data ||
        error.message ||
        error.error ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const verifyInstitutionEmail = createAsyncThunk(
//   'institution/verifyEmail',
//   async (verificationData, thunkAPI) => {
//     try {
//       return await institutionService.verifyInstitutionEmail(
//         verificationData.id,
//         verificationData.verificationCode
//       );
//     } catch (error) {
//       const message =
//         error.response?.data.message ||
//         error.response?.data ||
//         error.message ||
//         error.error ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );



export const verifyInstitutionEmail = createAsyncThunk(
  'institution/verifyEmail',
  async (verificationData, thunkAPI) => {
    try {
      // Include the institution data here
      const institutionUserData = await institutionService.verifyInstitutionEmail(
        verificationData.id,
        verificationData.verificationCode
      );
      saveInstitutionUserData(institutionUserData);
      return institutionUserData;
    } catch (error) {
      const message = error.response?.data.message || error.response?.data || error.message || error.error || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const loginInstitution = createAsyncThunk(
  'institution/login',
  async (loginData, thunkAPI) => {
    try {
      return await institutionService.loginInstitution(loginData);
    } catch (error) {
      const message =
        error.response?.data.message ||
        error.response?.data ||
        error.message ||
        error.error ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const institutionSlice = createSlice({
  name: 'institution',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerInstitution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerInstitution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.institution = action.payload;
      })
      .addCase(registerInstitution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.institution = null;
      })
      .addCase(verifyInstitutionEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyInstitutionEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.institution = action.payload;
      })
      .addCase(verifyInstitutionEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.institution = null;
      })
      .addCase(loginInstitution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginInstitution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.institution = action.payload;
      })
      .addCase(loginInstitution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.institution = null;
      });
  },
});

export const { reset } = institutionSlice.actions;

export default institutionSlice.reducer;
