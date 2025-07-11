import * as matchers from '@testing-library/jest-dom/matchers'
import { afterEach, beforeAll, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)

beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true
  })

  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

afterEach(() => {
  cleanup()
})
