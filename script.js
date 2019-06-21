const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru&query=' + searchText;
    movie.innerHTML = 'Loading';

    fetch(server)
        .then(function(value) {
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            output.results.forEach(function(item) {
                console.log( item );
                let nameItem = item.name || item.title;
                inner +=`<div class = "col-12 col-md-4 col-xl-3"> ${nameItem}</div>`;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.log('error: ' + reason.status);
        });

}

searchForm.addEventListener('submit', apiSearch);
