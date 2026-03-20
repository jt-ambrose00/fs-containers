import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import Todo from './Todo'

test('exercise 14 test', () => {
  const todo = {
    _id: '69b4891afe00f4b9c7591667',
    text: 'Write code',
    done: true
  }

  render(
    <Todo
      todo={todo}
      deleteTodo={() => {}}
      completeTodo={() => {}}
    />
  )

  expect(screen.getByText('Write code')).toBeInTheDocument()
})
