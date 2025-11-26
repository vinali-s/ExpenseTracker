export const BASE_URL = 'http://localhost:8000';

//utils/apiPaths.js

export const API_PATHS = {
    AUTH: {
        LOGIN: `/api/v1/auth/login`,
        REGISTER: `/api/v1/auth/register`,
        GET_USER_INFO: `/api/v1/auth/user`,
    },
    DASHBOARD: {
        GET_DATA: `/api/v1/dashboard/data`,
    },
    INCOME: {
        ADD_INCOME: `/api/v1/income/add`,
        GET_ALL_INCOME: `/api/v1/income`,
        DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
    },
    EXPENSES: {
        ADD_EXPENSE: `/api/v1/expenses/add`,
        GET_ALL_EXPENSES: `/api/v1/expenses`,
        DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/delete/${expenseId}`,
        DOWNLOAD_EXPENSES: `/api/v1/expenses/downloadexcel`,
    },
    IMAGE: {
        UPLOAD_IMAGE: `/api/v1/auth/upload-image`,
    }
}