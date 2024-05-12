import { configureStore } from '@reduxjs/toolkit'
import doctorReducer from './reducers/doctorReducer'
import patientReducer from './reducers/patientReducer'

export const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    patient:patientReducer
  },
})