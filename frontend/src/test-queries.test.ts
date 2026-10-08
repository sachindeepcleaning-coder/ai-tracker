import { describe, it, expect } from 'vitest'
import { getByRole, getAllByRole, getByTestId, getAllByTestId } from './test-queries.js'

function fixture(): HTMLDivElement {
  const div = document.createElement('div')
  div.innerHTML = `
    <ul role="list">
      <li role="listitem" data-testid="card">Alpha model</li>
      <li role="listitem" data-testid="card">Beta model</li>
    </ul>
    <button role="tab" data-testid="tab-one">One</button>`
  return div
}

describe('test-queries helpers', () => {
  it('finds by role, optionally filtered by name', () => {
    const root = fixture()
    expect(getAllByRole(root, 'listitem')).toHaveLength(2)
    expect(getByRole(root, 'listitem', 'Beta').textContent).toContain('Beta')
    expect(getByRole(root, 'tab', 'One').textContent).toBe('One')
  })

  it('finds by testid', () => {
    const root = fixture()
    expect(getAllByTestId(root, 'card')).toHaveLength(2)
    expect(getByTestId(root, 'tab-one').textContent).toBe('One')
  })

  it('throws a descriptive error when nothing matches', () => {
    const root = fixture()
    expect(() => getByRole(root, 'dialog')).toThrow('no [role="dialog"]')
    expect(() => getByRole(root, 'listitem', 'Gamma')).toThrow('Gamma')
    expect(() => getByTestId(root, 'nope')).toThrow('no [data-testid="nope"]')
  })
})
