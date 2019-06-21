const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru&query=' + searchText;
    movie.innerHTML = 'Loading';

    fetch(server)
        .then(function(value) {
            if(value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            console.log('!!!', output);
            let inner = '';
            output.results.forEach(function(item) {
                console.log( item );
                let nameItem = item.name || item.title;
                inner += `
                    <div class = "col-12 col-md-4 col-xl-3 item"> 
                        <img src = '${urlPoster + item.poster_path}' alt = '${nameItem}'>
                        <h5> ${nameItem} </h5>
                    </div>
            `;
            });
            movie.innerHTML = inner;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.error('error: ' + reason.status);
        });

}

searchForm.addEventListener('submit', apiSearch);
