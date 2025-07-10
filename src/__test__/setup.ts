import { afterEach, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

// Extend expect dari Vitest secara eksplisit
expect.extend(matchers)

afterEach(() => {
  cleanup()
})
