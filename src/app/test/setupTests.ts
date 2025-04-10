// src/setupTests.ts
import '@testing-library/jest-dom' // для удобных матчеров
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
