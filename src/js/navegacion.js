(function () {

const nav = document.querySelector('.navegacion')
const res = document.querySelector('.responsive')

nav.addEventListener('click', e => {
    res.classList.toggle('hidden');
})

})()