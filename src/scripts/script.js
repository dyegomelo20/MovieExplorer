// elementos
const filmeList = document.querySelector('.filmes-list');
const SerieList = document.querySelector('.series-list')
const containerbanner = document.querySelector('.banner')

//configurando API

const filmeApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWVhOTIzZDI0ZThhZDU3MGZhOGU3MjE3YzM5NzM4MSIsIm5iZiI6MTc2MTc2NTI2NC40MDk5OTk4LCJzdWIiOiI2OTAyNjc5MGViMzQ1NDZmZmVmZTUzNzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8GlmfZe9u3MQjXBvDq2iXEdfFHVNh8cDreulCj9bGG4',
        'Content-Type': 'application/json;charset=utf-8'
    }
});


// funçoes
async function getfilmes(){
    const data = await filmeApi.get('/movie/popular?language=pt-BR')
    console.log(data.data);
    return data.data.results
}
async function getSeries(){
    const data = await filmeApi.get('/tv/popular?language=pt-BR')
    console.log(data.data);
    return data.data.results
}

function geraid() {
    return Math.floor(Math.random() * 10000);
    
}

const renderFilmes = (filmes) => {
    filmeList.innerHTML = '';
    filmes.forEach(filme => {
    const filmeItem = document.createElement('div')
    filmeItem.classList.add('filme-item')
    filmeItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
        <h2>${filme.title}</h2>`
        filmeList.appendChild(filmeItem);       
    });
} 

const renderSerie = (series) => {
    SerieList.innerHTML = '';
    series.forEach(serie => {
    const serieItem = document.createElement('div')
    serieItem.classList.add('serie-item')
    serieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}">
        <h2>${serie.name}</h2>`
        SerieList.appendChild(serieItem);       
    });
} 

const randomBanner = async (filmes) => {
    id = geraid()
    console.log(id)
    const filme = await filmeApi.get(`/movie/${id}?language=pt-BR`)
     containerbanner.querySelector("h1").innerText = filme.data.title
     containerbanner.querySelector("p").innerText = filme.data.overview
     containerbanner.querySelector("img").src = `https://image.tmdb.org/t/p/w500${filme.data.backdrop_path}`
    console.log(filme.data);
    
    
}


//chamando a funçao de filmes
const iniciar = async () => {
    const filmes = await getfilmes()
    const Serie = await getSeries()
    randomBanner()
    renderFilmes(filmes);
    renderSerie(Serie);
     
}
iniciar()
