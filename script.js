const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) {
            movie.innerHTML = 'Загрузка';
            return;
        }

        if(request.status !== 200) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            console.log( item );
            let nameItem = item.name || item.title;
            inner +=`<div class = "col-3"> ${nameItem}</div>`;
        });

        movie.innerHTML = inner;


    });

}