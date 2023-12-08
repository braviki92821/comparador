(function() {
//los elementos de la navegacion normal de usuario normal
const nav = document.querySelector('.navegacion')
const res = document.querySelector('.responsive')
//cuando el header es chico se ocutan las pestañas para el responsive lo que hace este bton solo mostarar o ocultara
//el contenido
nav.addEventListener('click', e => {
    //toggle funciona para modificar la clase css exista o no en el elemento
    res.classList.toggle('hidden');
})

//los elementos para el rango de precios
const rangeLaptop = document.querySelector('.rango-laptop')
const rangeTelefono = document.querySelector('.rango-telefono')
const rangeTablet = document.querySelector('.rango-tablet')

//el evento change se ejecutara cada vez que se detecten cambios o movimiento en un elemento html
//el ? representa que el elemento puede o no existir(evitamos el error 'no se encuentra el elemento')
rangeLaptop?.addEventListener('change', e => {
    //el elemento es de link para hacer redirecion al momento de cambiar el valor rango
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