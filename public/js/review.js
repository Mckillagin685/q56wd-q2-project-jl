// 'use strict';
// 
//   $.getJSON('/jobs')
//     .done((jobs) => {
//       const $jobs = $('#jobs');
//
//       for (const job of jobs) {
//         const $anchor = $('<a>')
//           .attr({
//             href: `/job.html?id=${job.id}`,
//             'data-delay': '50',
//             'data-tooltip': job.title
//           })
//           .tooltip();
//
//         const $card = $('<div>').addClass('card');
//         const $cardImage = $('<div>').addClass('card-image');
//         const $col = $('<div>').addClass('col s6 m4 l3');
//         const $img = $('<img>').attr({ src: job.coverUrl, alt: job.title });
//
//         $cardImage.append($img);
//         $anchor.append($cardImage);
//         $card.append($anchor);
//         $col.append($card);
//         $jobs.append($col);
//       }
//     })
//     .fail(() => {
//       Materialize.toast('Unable to retrieve jobs', 3000);
//     });
