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
            "<img src=\"http://img.omdbapi.com/?i={{imdbID}}&apikey=30bfd0c9&h=150\"></img>",
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
                "<img class=\"ui avatar image rt\" data-title=\"Critics Rating\" data-content=\"{{generateRTCriticsTitle tomatoImage}}\" src=\"{{generateRTCriticsImage tomatoImage}}\"><span><strong>{{tomatoMeter}}%</strong></span><br />",
                "<img class=\"ui avatar image rt\" data-title=\"Audience Rating\" data-content=\"{{generateRTUsersTitle tomatoUserMeter}}\" src=\"{{generateRTUsersImage tomatoUserMeter}}\"><span><strong>{{tomatoUserMeter}}%</strong></span><br />",
            "</div>",
            "<div class=\"more-info-box\">",
                "<button class=\"ui small orange circular icon button\" id=\"btnRTMoreInfo-{{imdbID}}\">",
                    "<i class=\"info icon link\"></i>",
                "</button>",
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
    "<strong>Fresh:</strong> {{tomatoFresh}} / {{tomatoReviews}}<br />",
    "<strong>User Rating:</strong> {{tomatoUserMeter}}%",
    "<small>({{addCommas tomatoUserReviews}} reviews)</small><br />",
    "<br />",
    "<strong><small><em>&ldquo;{{tomatoConsensus}}&rdquo;</em></small></strong><br />",
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

Handlebars.registerHelper("generateRTCriticsImage", function (image) {
    var baseUrl = "images/";
    if (image == "N/A") {
        return baseUrl + "na.png";
    }

    return baseUrl + image + ".png";
});

Handlebars.registerHelper("generateRTCriticsTitle", function (image) {
    switch (image) {
        case "certified":
            return "Certified Fresh!";

        case "fresh":
            return "Fresh!";

        case "rotten":
            return "Rotten";
    }

    return "Rating not available";
});

Handlebars.registerHelper("generateRTUsersImage", function (rating) {
    var baseUrl = "images/";
    return parseInt(rating) < 60
        ? baseUrl + "rt_audience_no.png"
        : baseUrl + "rt_audience_yes.png";
});

Handlebars.registerHelper("generateRTUsersTitle", function (rating) {
    return parseInt(rating) < 60
        ? "Only " + rating + "% audiences liked it"
        : rating + "% audiences liked it!";
});