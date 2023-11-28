let pagina =1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


btnSiguiente.addEventListener('click', () => {
    if(pagina<1000){
        pagina +=1;
        cargarPeliculas();
    }
});
btnAnterior.addEventListener('click', () => {
    if(pagina>1){
        pagina -=1;
        cargarPeliculas();
    }
});



const cargarPeliculas = async() =>{

    try{

        const respuesta = await fetch(`http://api.themoviedb.org/3/movie/popular?api_key=79e2f77bcb17b097827f4f4afcb0929d&language=es-MX&page=${pagina}`);
        
        // la respuesta es correcta
        if(respuesta.status === 200){
            const datos=await respuesta.json();
            
            let peliculas ='';
            datos.results.forEach(pelicula=>{
                peliculas+= `
                <div class ="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                </div>
                
                <h3 class="titulo">${pelicula.title}</h3>
                
                `
                


            });
            document.getElementById('contenedor').innerHTML = peliculas ;




        }else if(respuesta.status===401){
            console.log('pususte la llave mal')
        }else if(respuesta.status===404){
            console.log('la pelicula que buscas no existe')
        }else{
            console.log('Hubo un error y  favor de dirigirse a area de soporte')
        }
        const datos=await respuesta.json();
        console.log(datos);
        
    } catch(error){
        console.log(error);


    }

}

cargarPeliculas();