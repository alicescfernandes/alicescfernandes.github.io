var projects = getProjects()
var i = 0;
var total = projects.length;
var perPage = 3;
var modal_state = false;

function getItems() {
    var extraHTML = "";
    for (; i != perPage; i++) {
        if (projects[i].urls === undefined) {

            var urls = projects[i].urls;
            for (var opt in urls) {
                extraHTML = '<a  target="_blank" href="' + urls[opt] + '" class="btn btn-small">Disponivel no Github</a>';
            }
        }
        var html = '<div class="result" data-pid="' + projects[i].nome + '" onclick="modal(event)">\
          <div class="result-image" style="background-image:url(projects/' + projects[i].nome + '/thumb.jpg)"></div>\
          <div class="projeto-hover hide">\
            <h2>' + projects[i].title + '</h2>\
            <p>' + projects[i].sumario + '</p>' + extraHTML + '</div></div>'

        document.querySelector('.porfolio-search').insertAdjacentHTML('beforeend', html)


    }

    if (total > perPage) {
        if (!document.querySelector('.plus')) {
            var html = '<button class="btn btn--dynamic plus"><i class="fa fa-plus"></i>Projetos</button>';
            document.querySelector('.results').insertAdjacentHTML('beforeend', html);
        }
    }
}

window.onload = function() {
    getItems();
    document.querySelector('.plus').onclick = function() {
        i = perPage;
        perPage += perPage;
       if (total === perPage || total < perPage) {
        document.querySelector('.plus').style.display = "none";
    }
        getItems();

    }
}



function modal(e) {
    var portfolio = getProjects();
    var extraHTML = "";
    var nome =  e.target.offsetParent.getAttribute("data-pid");
	
    if (modal_state == false) {
        for (let projeto in portfolio) {
            if (portfolio[projeto].nome === nome) {
                if (portfolio[projeto].urls) {
                    var urls = portfolio[projeto].urls;
                    for (var opt in urls) {
                        extraHTML = '<a  target="_blank" href="' + urls[opt] + '" style="border-color:' + portfolio[projeto].color + ';color:' + portfolio[projeto].color + '" class="btn btn-small btn-color">Disponivel no Github</a>';
                    }
                }
                document.getElementsByTagName("body")[0].innerHTML += ' <div class="showcase"><div class="details"><i onclick="modal(event)" class="fa fa-close"></i><h2>' + portfolio[projeto].title + '</h2><div class="image" style="background-color:' + portfolio[projeto].color + ';background-image:url(\'projects/' + portfolio[projeto].nome + '/img' + portfolio[projeto].length + '.jpg\')"><img src=""></div><p>' + portfolio[projeto].sumario + '</p>' + extraHTML + '</div></div>'
                var modal_html = document.querySelector(".showcase")
                modal_html.style.opacity = "1";
                modal_html.style.transition = "all 0.2s"
            }
        }

    modal_state = true;
    }else{
        var modal_html = document.querySelector(".showcase")
        modal_html.style.opacity = "0";
        modal_html.style.transition = "all 0.3s"
        setTimeout(
                function() {
                    document.getElementsByTagName("body")[0].removeChild(modal_html)
                }, 310)
            //
        modal_state = false;
    }


}