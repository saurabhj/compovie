Templates.movie = {};

Templates.movie.header = [
    "<table id=\"tabMovies\" class=\"ui striped stackable table\">",
        "<thead>",
            "<tr>",
                "<th colspan=\"2\">Film</th>",
                "<th style=\"width: 110px\" class=\"center aligned icon-header\">",
                    "<img class=\"popup\" data-title=\"IMDB Rating\" alt=\"IMDB\" src=\"images/imdb_logo.png\"></img>",
                "</th>",
                "<th style=\"width: 110px\" class=\"center aligned icon-header\">",
                    "<img class=\"popup\" data-title=\"Rotten Tomatoes Rating\" alt=\"Rotten Tomatoes\" src=\"images/rt_logo.png\"></img>",
                "</th>",
                "<th style=\"width: 110px\" class=\"center aligned icon-header\">",
                    "<img class=\"popup\" data-title=\"Metacritic Rating\" alt=\"Metacritic\" src=\"images/metacritic_logo.png\"></img>",
                "</th>",
            "</tr>",
        "</thead>",
        "<tbody>"
].join("\n");

Templates.movie.body = [
    "<tr id=\"tr-{{imdbID}}\" data-rating=\"{{imdbRating}}\">",
        "<td style=\"width: 120px\" class=\"center top aligned\">",
            "<img src=\"https://img.omdbapi.com/?apikey=636bd88a&h=150&i={{imdbID}}\"></img>",
        "</td>",
        "<td class=\"top aligned\">",
            "<strong>{{Title}} ({{Year}})</strong><br />",
            "<strong>Rated:</strong> {{Rated}}, <strong>Runtime:</strong> {{Runtime}}<br />",
            "<em>{{Plot}}</em><br />",
            "<br />",
            "<strong>Directed by:</strong> {{Director}}<br />",
            "<strong>Starring:</strong> {{Actors}}",
        "</td>",
        "<td class=\"center aligned\">",
            "<div class=\"rating-box\">",
                "<strong>{{imdbRating}} / 10</strong><br />",
                "<small>({{imdbVotes}}&nbsp;votes)</small><br />",
            "</div>",
            "<div class=\"more-info-box\">",
                "<a class=\"ui small orange circular icon button\" href=\"http://www.imdb.com/title/{{imdbID}}/\" target=\"_blank\">",
                    "<i class=\"external square icon\"></i>",
                "</a>",
            "</div>",
        "</td>",
        "<td class=\"center aligned\">",
            "<div class=\"rating-box\">",
                "<strong>{{rt-rating}}</strong>",
            "</div>",
            "<div class=\"more-info-box\">",
                "<a class=\"ui small orange circular icon button\" href=\"http://www.rottentomatoes.com/m/{{generateRTString Title}}\" target=\"_blank\">",
                    "<i class=\"external square icon\"></i>",
                "</a>",
            "</div>",
        "</td>",
        "<td class=\"center aligned\">",
            "<div class=\"rating-box\">",
                "<strong>{{Metascore}}</strong>",
            "</div>",
            "<div class=\"more-info-box\">",
                "<a class=\"ui small orange circular icon button\" href=\"http://www.metacritic.com/movie/{{generateMetacriticString Title}}\" target=\"_blank\">",
                    "<i class=\"external square icon\"></i>",
                "</a>",
            "</div>",
        "</td>",
    "</tr>"
].join("\n");

Templates.movie.footer = [
        "</tbody>",
    "</table>"
].join("\n");

Templates.movie.rottenTomatoesBox = [
    
].join("\n");

Handlebars.registerHelper("generateRTString", function (title) {
    return title.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
});

Handlebars.registerHelper("generateMetacriticString", function (title) {
    return title.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
});

Handlebars.registerHelper("addCommas", function (number) {
    return parseInt(number).formatNumber(0);
});