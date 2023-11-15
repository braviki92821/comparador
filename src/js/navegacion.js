(function () {

const nav = document.querySelector('.navegacion')
const res = document.querySelector('.responsive')
const formLaptop = document.querySelector('.form-laptop')

nav.addEventListener('click', e => {
    res.classList.toggle('hidden');
})

const rangeLaptop = document.querySelector('.rango-laptop')

// rangeLaptop.addEventListener('change', async e => {
//         const input = document.createElement("input");
//         input.type = "number"
//         input.name = "precio"
//         let rango = Number(rangeLaptop.value)
//         let precio
//         switch (rango) {
//             case 0:
//                 precio = 0
//                 break;
//             case 1:
//                 precio = 10000
//                 break;
//             case 2:
//                 precio = 25000
//                 break;
//             case 3:
//                 precio = 35000
//                 break;
//             case 4:
//                 precio = 55000
//                 break;
//             case 5:
//                 precio = 75000
//                 break;
//             default:
//                 precio = 0
//                 break;
//         }
//         input.value = precio
//         formLaptop.append(input)
//         formLaptop.submit()
// })


})()