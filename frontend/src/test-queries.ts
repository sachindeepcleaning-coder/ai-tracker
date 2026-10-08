/**
 * Test-only query helpers (import from tests only — never from app code).
 * Role-first, testid-second: tests must not depend on CSS classes, tag names,
 * or visible copy. querySelector with arbitrary selectors is banned in new
 * tests; use these so a restyle or copy tweak cannot break the suite.
 */

export function getAllByRole(root: ParentNode, role: string): Element[] {
  return [...root.querySelectorAll(`[role="${role}"]`)]
}

export function getByRole(root: ParentNode, role: string, name?: string): Element {
  const all = getAllByRole(root, role)
  const hit = name == null
    ? all[0]
    : all.find((el) => (el.textContent ?? '').includes(name))
  if (!hit) throw new Error(`test-queries: no [role="${role}"]${name ? ` containing ${JSON.stringify(name)}` : ''} (found ${all.length})`)
  return hit
}

export function getAllByTestId(root: ParentNode, id: string): Element[] {
  return [...root.querySelectorAll(`[data-testid="${id}"]`)]
}

export function getByTestId(root: ParentNode, id: string): Element {
  const hit = root.querySelector(`[data-testid="${id}"]`)
  if (!hit) throw new Error(`test-queries: no [data-testid="${id}"]`)
  return hit
}
