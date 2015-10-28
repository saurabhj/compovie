var TOTAL_MOVIES = 0;
var HIGHEST_RATING = 0;

$(document).ready(function () {
    // Focus the search text box on page load
    $("#txtSearch").focus();

    // Instantiate the autocomplete for the search box
    $("#txtSearch").autocomplete({
        minChars: 2,
        preventBadQueries: false,
        lookup: function (query, done) {
            $("#divSearch").addClass("loading");

            $.ajax({
                url: "http://www.omdbapi.com/",
                dataType: "jsonp",
                data: {
                    s: query.trim(),
                    type: "movie"
                },
                success: function (data) {
                    $("#divSearch").removeClass("loading");
                    var completeArray = _.map(data.Search, function (item) {
                        return {
                            value: item.Title + " (" + item.Year + ")",
                            data: item.imdbID
                        }
                    });

                    var suggestions = [];
                    $.each(completeArray, function (index, item) {
                        if (_.findWhere(suggestions, { data: item.data }) == undefined) {
                            suggestions.push(item);
                        }
                    });

                    var result = {};
                    result.suggestions = suggestions;
                    done(result);
                }
            }).fail(function () {
                $("#divSearch").removeClass("loading");
            });
        },
        onSelect: function (suggestion) {
            addMovie(suggestion.data);

            $("#txtSearch").val("");
            $("#txtSearch").focus();
        }
    });
});

// Query the API and pull complete information on the film
function addMovie(imdbId) {
    var plotLength = "short";
    if ($("#chkLongerPlot").prop("checked") == true) {
        plotLength = "full";
    }

    $.ajax({
        url: "http://www.omdbapi.com/",
        dataType: "jsonp",
        data: {
            i: imdbId,
            plot: plotLength,
            r: "json",
            tomatoes: true
        },
        success: function (data) {
            addMovieToTable(data);
        }
    }).fail(function () {
    });
}

// Render the UI
function addMovieToTable(data) {
    if (TOTAL_MOVIES == 0) {
        $("#divResults").html(Templates.movie.header);
        $("#divResults").append(Templates.movie.footer);
        $('.popup').popup({ inline: true });
    }

    var template = Handlebars.compile(Templates.movie.body);
    var html = template(data);

    $("#tabMovies > tbody:last-child").append(html);
    TOTAL_MOVIES++;

    if (data.imdbRating != "N/A") {
        var rating = parseFloat(data.imdbRating);
        if (HIGHEST_RATING < rating) {
            HIGHEST_RATING = rating;
        }
    }

    if (TOTAL_MOVIES > 1) {
        $("#tabMovies > tbody > tr").removeClass("positive");
        $.each($("#tabMovies > tbody > tr"), function (index, value) {
            if ($(value).data("rating") != "N/A" && parseFloat($(value).data("rating")) == HIGHEST_RATING) {
                $(value).addClass("positive");
            }
        });
    }

    var templateRT = Handlebars.compile(Templates.movie.rottenTomatoesBox);

    // Adding more information for IMDB
    $("#btnRTMoreInfo-" + data.imdbID).popup({
        title: "More information",
        html: templateRT(data)
    });

    $(".rt").popup();
}

/*
 * Util Methods
*/

Number.prototype.formatNumber = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};