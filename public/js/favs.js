(function() {
  'use strict';

  $.getJSON('/favs/jobs')
    .done((jobs) => {
      // const $books = $('#books');

      for (const job of jobs) {
        const $anchor = $('<a>')
          .attr({
            href: `${job.url}`,
          })

        // const $card = $('<div>').addClass('card');
        // const $cardImage = $('<div>').addClass('card-image');
        // const $col = $('<div>').addClass('col s6 m4 l3');
        //
        // $cardImage.append($img);
        // $anchor.append($cardImage);
        // $card.append($anchor);
        // $col.append($card);
        // $books.append($col);
      }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve favorites', 3000);
    });
})();
