(function() {

const nav = document.querySelector('.navegacion')
const res = document.querySelector('.responsive')

nav.addEventListener('click', e => {
    res.classList.toggle('hidden');
})

const rangeLaptop = document.querySelector('.rango-laptop')
const rangeTelefono = document.querySelector('.rango-telefono')
const rangeTablet = document.querySelector('.rango-tablet')


rangeLaptop?.addEventListener('change', e => {
    const a = document.createElement('a')
    a.href=`/laptops?pagina=1&precio=${rangeLaptop.value}`
    a.click()
})

rangeTelefono?.addEventListener('change', e => {
    const a = document.createElement('a')
    a.href=`/telefonos?pagina=1&precio=${rangeTelefono.value}`
    a.click()
})

rangeTablet?.addEventListener('change', e => {
    const a = document.createElement('a')
    a.href=`/tablets?pagina=1&precio=${rangeTablet.value}`
    a.click()
})

})()