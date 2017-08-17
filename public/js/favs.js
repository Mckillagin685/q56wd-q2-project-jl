(function() {
  'use strict';

  $.getJSON('/favs/jobs')
    .done((jobs) => {
      const $container = $('#favorites');

      for (const job of jobs) {
        const $jobli = $('<li>');
        const $jobHeader = $('<div>').addClass('collapsible-header');
        const $jobHeaderJob = $('<div>').text(job.job_title);
        const $jobHeaderAge = $('<div>').text(job.post_age);
        const $jobBody = $('<div>').addClass('collapsible-body');
        const $jobCompany = $('<h4>').text('Company: ' + job.employer);
        const $divider1 = $('<div>').addClass('divider');
        const $jobTerms = $('<span>').text('Terms: ' + job.job_terms);
        const $divider2 = $('<div>').addClass('divider');
        const $jobSkills = $('<span>').text('Skill Prefrence: ' + job.job_skills);
        const $divider3 = $('<div>').addClass('divider');
        const $jobDescTitle = $('<h4>').text('Job Summary');
        const $divider4 = $('<div>').addClass('divider');
        const $jobDesc = $('<p>').text(job.job_description);
        const $divider5 = $('<div>').addClass('divider');
        const $link = $('<a>').addClass('btn').attr('href', job.url ).text('Apply Here');
        const $del = $('<span>').attr({'id': 'deleteFav', 'data-id': job.id}).addClass('btn waves-light red right').text('delete favorite');

        $jobBody.append($jobCompany);
        $jobBody.append($divider1);
        $jobBody.append($jobTerms);
        $jobBody.append($divider2);
        $jobBody.append($jobSkills);
        $jobBody.append($divider3);
        $jobBody.append($jobDescTitle);
        $jobBody.append($divider4);
        $jobBody.append($jobDesc);
        $jobBody.append($divider5);
        $jobBody.append($link);
        $jobBody.append($del);
        $jobHeader.append($jobHeaderJob);
        $jobHeader.append($jobHeaderAge);
        $jobli.append($jobHeader);
        $jobli.append($jobBody);
        $container.append($jobli);
      }
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve favorites', 3000);
    });

    $('html').click((event) => {
      console.log(event.target.attributes)
      // if(event.target.attributes) {
      //   console.log(event.target.attributes)
      // }
    })
})();
