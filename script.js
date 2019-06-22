const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';


// -----------------------  Search movie !!! -----------------------------------

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value;

    if(searchText.trim().length === 0) {
       movie.innerHTML = '<h2 class = "col-12 text-center text-danger">Поле поиска не должно быть пустым !</h2>';
       return;
    }

    movie.innerHTML = '<div class="spinner"></div>';

    fetch('https://api.themoviedb.org/3/search/multi?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru&query=' + searchText)
        .then(function(value) {

            if(value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            //console.log('!!!', output); --------------------
            let inner = '';

            if(output.results.length === 0) {
                inner = '<h2 class = "col-12 text-center text-info">По вашему запросу ничего не найдено !</h2>';
            }

            output.results.forEach(function(item) {
                //console.log( item ); ---------------------------
                let nameItem = item.name || item.title;
                let poster = item.poster_path ? urlPoster + item.poster_path : './images/no-poster.jpeg';
                let dataInfo = '';

                if(item.media_type !== 'person') dataInfo = ` data-type="${item.media_type}" data-id="${item.id}"`;

                inner += `
                    <div class = "col-12 col-md-4 col-xl-3 item"> 
                        <img src = "${poster}" class = "img_poster" alt = "${nameItem}" ${dataInfo}>
                        <h5> ${nameItem} </h5>
                    </div>
            `;
            });
            movie.innerHTML = inner;

            addEventMedia();

            const media = movie.querySelectorAll('img[data-id]');
            media.forEach(function(elem) {
                elem.style.cursor = 'pointer';
                elem.addEventListener('click', showFullInfo);
            });

        })
        .catch(function(reason) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.error(reason || reason.status);
        });

}

searchForm.addEventListener('submit', apiSearch);

function addEventMedia() {

}

function showFullInfo() {
    let url = '';
    if(this.dataset.type === 'movie') {
        url = 'https://api.themoviedb.org/3/movie/' + this.dataset.id + '?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru';
    }else if(this.dataset.type === 'tv') {
        url = 'https://api.themoviedb.org/3/tv/' + this.dataset.id + '?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru';
    }else {
        movie.innerHTML = '<h2 class = "col-12 text-center text-danger">Произошла ошибка, повторите позже!</h2>';
    }


    fetch(url)
        .then(function(value) {

            if(value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();

        })
        .then(function(output) {
            console.log('output: ', output);
            movie.innerHTML = `
                <h4 class = 'col-12 text-center text-info'>${output.name || output.title}</h4>
                <div class = 'col-4'>
                    <img class = 'img_poster' src = '${urlPoster + output.poster_path}' alt = '${output.name}'>
                    ${(output.homepage) ? `<p class = 'text-center'><a href = '${output.homepage}' target = '_blank'>Официальная страница</a></p>` : ''}
                    ${(output.homepage) ? `<p class = 'text-center'><a href='https://imdb.com/title/${output.imdb_id}'  target = '_blank'>Страница на IMDB.com</a></p>` : ''}
                </div>
                <div class = 'col-8'>
                
                </div>
            `;
        })
        .catch(function(reason) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.error(reason || reason.status);
        });

}



// ------------------- Week trands !!! ---------------------

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=c59b6e24db75f305359d3e98932fa2c9&language=ru')
        .then(function(value) {

            if(value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            //console.log('output: ', output); // -------------------

            let inner = '<h4 class = "col-12 text-center text-info">Самые популярные за неделю</h4>';

            if(output.results.length === 0) {
                inner = '<h2 class = "col-12 text-center text-info">По вашему запросу ничего не найдено !</h2>';
            }

            output.results.forEach(function(item) {
                //console.log( item ); -------------------
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                let poster = item.poster_path ? urlPoster + item.poster_path : './images/no-poster.jpeg';
                let dataInfo = ` data-type="${mediaType}" data-id="${item.id}"`;

                inner += `
                    <div class = "col-12 col-md-4 col-xl-3 item">
                        <img src = "${poster}" class = "img_poster" alt = "${nameItem}" ${dataInfo}>
                        <h5> ${nameItem} </h5>
                    </div>
            `;
            });
            movie.innerHTML = inner;

            addEventMedia();

            const media = movie.querySelectorAll('img[data-id]');
            media.forEach(function(elem) {
                elem.style.cursor = 'pointer';
                elem.addEventListener('click', showFullInfo);
            });

        })
        .catch(function(reason) {
            movie.innerHTML = 'Что то пошло совсем не так !';
            console.error(reason || reason.status);
        });
});
