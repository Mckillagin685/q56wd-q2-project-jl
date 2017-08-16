'use strict';

$('#glassDoor').hide()

let searchString = '';
let jobs = []
let jobList = []
const getJobs = function(name) {

  $('.progress').css('visibility', 'visible');

  var $xhr = $.getJSON(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${searchString}`);
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      return;
    }

    jobList = data.resultItemList;

    const newJobs = [];
    for (const item of jobList) {
      const newItem = {
        url: item.detailUrl,
        title: item.jobTitle,
        company: item.company,
        location: item.location,
        date: item.date
      };
      newJobs.push(newItem);
    }
    jobs = newJobs;
    renderJobs();
    $('.progress').css('visibility', 'hidden');
  });
  searchString = '';
};

$("#getJobs").submit(function(event) {
  event.preventDefault();

  $("#jobs").empty();

  var title = $('#title').val();
  var location = $('#location').val();

  searchString = (title + '&city=' + location);

  getJobs(name);
});

const renderJobs = function() {

  const jobsTable = $('#jobs')
  const $table = $('<table>').attr("class", "striped")
  const $thead = $('<thead>')
  let $tr = $('<tr>')
  const $thTitle = $('<th>').text('Job Title')
  const $thCompany = $('<th>').text('Company')
  const $thLocation = $('<th>').text('Location')
  const $thDate = $('<th>').text('Date Posted')
  const $tbody = $('<tbody>').attr("id", "tableBody")

  $tr.append($thTitle)
  $tr.append($thCompany)
  $tr.append($thLocation)
  $tr.append($thDate)
  $thead.append($tr)
  $table.append($thead)
  $table.append($tbody)
  jobsTable.append($table)

  for (let job of jobs) {

    let $jobTitle = $('<button>').text(job.title).attr({id: job.url, class: 'getJob'})
    let $td = $('<td>')
    let $jobCompany = $('<td>').text(job.company)
    let $jobLocation = $('<td>').text(job.location)
    let $jobDate = $('<td>').text(job.date)
    let $tr = $('<tr>')
    let tBody = $('#tableBody')

    $td.append($jobTitle)
    $tr.append($td)
    $tr.append($jobCompany)
    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)
  }

  $(".getJob").click(function(event) {
    event.preventDefault();

    $("#job").empty();

    $('#jobs').slideUp('slow')

    $('#job').slideUp('slow')

    const jobUrl = event.target.id
    let jobTitle = ''
    let jobCompany = ''
    let jobLocation = ''
    let jobDate = ''


    for (let i = 0; i < jobs.length; i++) {

      if (jobs[i].url === jobUrl) {
        jobTitle = jobs[i].title
        jobCompany = jobs[i].company
        jobLocation = jobs[i].location
        jobDate = jobs[i].date
      }
    }


    const jobsTable = $('#job')
    const $table = $('<table>')
    const $thead = $('<thead>')
    let $tr = $('<tr>')
    const $thTitle = $('<th>').text('Job Title')
    const $thCompany = $('<th>').text('Company')
    const $thLocation = $('<th>').text('Location')
    const $thDate = $('<th>').text('Date Posted')
    const $tbody = $('<tbody>').attr('id', 'jobTableBody')

    $tr.append($thTitle)
    $tr.append($thCompany)
    $tr.append($thLocation)
    $tr.append($thDate)
    $thead.append($tr)
    $table.append($thead)
    $table.append($tbody)
    jobsTable.append($table)


    let $jobTitle = $('<a>').text(jobTitle).attr({
      href: jobUrl,
      target: '_blank'
    })
    let $tdT = $('<td>')
    let $tdC = $('<td>')
    let $jobCompany = $('<button>').attr('id', 'getJobCompany').text(jobCompany)
    let $jobLocation = $('<td>').text(jobLocation)
    let $jobDate = $('<td>').text(jobDate)
    $tr = $('<tr>')
    let tBody = $('#jobTableBody')

    $tdT.append($jobTitle)
    $tr.append($tdT)
    $tdC.append($jobCompany)
    $tr.append($tdC)
    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)

    const $divJobFooter = $('<div>').attr('id', 'jobFooter')
    const $backButton = $('<button>').text('Back to Summary').attr('id', 'jobBackToJobs')
    const $favoriteButton = $('<button>').text('Add to Favorites')
    const $divGlassDoor = $('#glassDoor')

    $divJobFooter.append($backButton)
    $divJobFooter.append($favoriteButton)
    jobsTable.append($divJobFooter)
    // jobsTable.append($divGlassDoor)

    $('#job').slideDown('slow')

    $("#jobBackToJobs").click(function(event) {
      event.preventDefault();

      $('#job').slideUp('slow')
      $('#jobs').slideDown('slow')
      $('#glassDoor').slideUp('slow')
    })

    $("#getJobCompany").click(function(event) {
      event.preventDefault();

      $("#glassDoor").empty();

      $('#glassDoor').slideUp('slow')

      const jobCompany = $(event.target).text()

      $.getJSON('/glassdoor/' + jobCompany)
        .done((GDComp) => {

          const company = GDComp[0];

          const renderCompany = function(company) {
            const glassDoor = $('#glassDoor')
            const $table = $('<table>').attr('id', 'glassDoorTable')
            const $tbody = $('<tbody>')
            const $tr = $('<tr>')
            const $tr1 = $('<tr>')
            const $tr2 = $('<tr>')
            const $tr3 = $('<tr>')
            const $tr4 = $('<tr>')
            const $tr5 = $('<tr>')
            const $tr6 = $('<tr>')
            const $tr7 = $('<tr>')
            const $tr8 = $('<tr>')
            const $tr9 = $('<tr>')
            const $tr10 = $('<tr>')

            const $aN = $('<a>').text(company.name).attr('href', company.featuredReview.attributionURL)
            console.log(company);
            console.log(company.featuredReview.attributionURL);
            const $tdN = $('<td>')
            $tdN.append($aN)
            $tr1.append($tdN)
            const $img = $('<img>').attr({
              src: company.squareLogo,
              height: "42",
              width: "42"
              })
              // console.log(company);
            const $tdL = $('<td>')
            $tdL.append($img)
            $tr1.append($tdL)
            console.log(company.website);
            const $aW = $('<a>').text(company.website).attr('href', ('http://' + company.website))
            const $tdW = $('<td>')
            $tdW.append($aW)
            $tr1.append($tdW)
            $tbody.append($tr1)

            const $tdI = $('<td>').text('Industry: ' + company.industry)
            $tr2.append($tdI)
            const $tdS = $('<td>').text('Sector: ' + company.sectorName)
            $tr2.append($tdS)
            const $tdNOR = $('<td>').text('Number of Ratings: ' + company.numberOfRatings)
            $tr2.append($tdNOR)
            $tbody.append($tr2)

            $table.append($tbody)
            glassDoor.append($table)

            // fis first greenDoor Table

            const $divGDR = $('<div>').attr({id: 'greenDoorRatings', class: 'col s6'})
            const $tableGDR = $('<table>').attr('class', 'striped')
            const $tableGDRHeader = $('<th>').text('Glassdoor Ratings')
            const $tableGDRBody = $('<tbody>').attr('id', 'tableGDR')
            $tableGDR.append($tableGDRHeader)
            $tableGDR.append($tableGDRBody)
            $divGDR.append($tableGDR)
            const $divFUR = $('<div>').attr({id: 'featuredUserReview', class: 'col s6'})
            const $tableFUR = $('<table>').attr('id', 'tableFUR').attr('class', 'striped')
            $divFUR.append($tableFUR)

            glassDoor.append($divGDR)
            glassDoor.append($divFUR)

            // *****************************************************************
            const greenDoorKeys = [
              "Rating Description:",
              "Overall Rating:",
              "Recommend to Friend Rating:",
              "Work Life Balance Rating:",
              "Work Life Balance Rating:",
              "Culture and Values Rating:",
              "Compensation and Benefits Rating:",
              "Career Opportunities Rating:",
              "Senior Leadership Rating:",
            ]

            const greenDoorVals = [
              "ratingDescription",
              "overallRating",
              "recommendToFriendRating",
              "workLifeBalanceRating",
              "workLifeBalanceRating",
              "cultureAndValuesRating",
              "compensationAndBenefitsRating",
              "careerOpportunitiesRating",
              "seniorLeadershipRating"
            ]

            // let tableGDR = $('#tableGDR')
            for (let i=0 ; i<greenDoorKeys.length ; i++) {
              const $row = $('<tr>')
              $row.append($('<td>').text(greenDoorKeys[i]))
              $row.append($('<td>').text(company[greenDoorVals[i]]))
              $tableGDRBody.append($row)
            }

            // *****************************************************************

            // const companyReview = company.featuredReview
            // const $divReview = $('<div>').attr('id', 'companyReview')
            //
            // const $title = $('<div>').text("Title: " + companyReview.headline).attr('class', 'row')
            // $divReview.append($title)
            // const $rating = $('<p>').text('Overall Rating: ' + companyReview.overall).attr('class', 'row')
            // $divReview.append($rating)
            // const $date = $('<p>').text('Review Date: ' + companyReview.reviewDateTime).attr('class', 'row')
            // $divReview.append($date)
            // const $job = $('<p>').text('Reviewd By: ' + companyReview.jobTitle).attr('class', 'row')
            // $divReview.append($job)
            // const $location = $('<p>').text('Location: ' + companyReview.location).attr('class', 'row')
            // $divReview.append($location)
            // const $current = $('<p>').text('Currently Employed at this company: ' + companyReview.currentJob).attr('class', 'row')
            // $divReview.append($current)
            // const $pro = $('<div>').text("Pro's: " + companyReview.pros).attr('class', 'row')
            // $divReview.append($pro)
            // const $con = $('<div>').text("Con's: " + companyReview.cons).attr('class', 'row')
            // $divReview.append($con)
            //
            // glassDoor.append($divReview)
          }
          renderCompany(company);
          $('#glassDoor').slideDown('slow')
        })
    })
  })
}
