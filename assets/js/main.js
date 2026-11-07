// Francink: smooth scroll, parallasse del titolo, filtro lavori
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

window.lenis = new Lenis({ autoRaf: true, autoToggle: true, anchors: true, allowNestedScroll: true, stopInertiaOnNavigate: true })

const nav = document.querySelector('.nav')
const parallax = [...document.querySelectorAll('[data-parallax]')]

function onScroll(y) {
  nav.classList.toggle('is-solid', y > 40)
  if (reduce) return
  for (const el of parallax) el.style.transform = `translate3d(0, ${y * el.dataset.parallax}px, 0)`
}

window.lenis.on('scroll', ({ scroll }) => onScroll(scroll))
onScroll(scrollY)

// filtro per stile
const tabs = [...document.querySelectorAll('.tabs button')]
const tiles = [...document.querySelectorAll('.tile')]
for (const tab of tabs) {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.setAttribute('aria-selected', t === tab))
    const f = tab.dataset.filter
    tiles.forEach((el) => el.classList.toggle('is-hidden', f !== 'tutti' && el.dataset.style !== f))
  })
}
