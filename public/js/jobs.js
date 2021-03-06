'use strict';

$('#messagesModal').hide()
$('#glassDoor').hide()
$(".button-collapse").sideNav();

let jobs = []
let jobList = []
const getJobs = function(title, location) {

  $('.progress').css('visibility', 'visible');

  const options = {
          contentType: 'application/json',
          data: {'title': title, 'location': location},
          dataType: 'json',
          type: 'GET',
          url: '/jobs'
        };


        $.ajax(options)
          .done((data) => {
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
          })
          .fail((err) => {
            Materialize.toast(err.responseText, 3000);
          });
};

$("#getJobs").submit(function(event) {
  event.preventDefault();

  $("#jobs").empty();

  var title = $('#title').val();
  var location = $('#location').val();

  if (isNaN(location) || location.length !== 5) {
    return Materialize.toast('Zip Code must be 5 Digits!', 3000);
  }

  getJobs(title, location);
});

const renderJobs = function() {

  const jobsTable = $('#jobs')
  const $table = $('<table>').attr("class", "striped")
  const $thead = $('<thead>')
  let $tr = $('<tr>')
  const $thTitle = $('<th>').text('Job Title (click to view job details)')
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

    let $jobTitle = $('<a>').text(job.title).attr({id: job.url, class: 'getJob waves-effect waves-light btn'})
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

    $('#searchForm').slideUp('slow')

    $('#jobs').slideUp('fast')

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
    const $thCompany = $('<th>').text('Company Review')
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
    let $Br1 = $('<br/>')
    let $Br2 = $('<br/>')
    let $aD = $('<a>').text('(click to view on dice.com)').attr('class', 'black-text')
    let $open = $('<i>').text('open_in_new').attr('class', 'material-icons') //<i class="material-icons">open_in_new</i>
    let $tdT = $('<td>')
    let $tdC = $('<td>')
    let $jobCompany = $('<a>').attr('id', 'getJobCompany').text(jobCompany).attr('class', 'waves-effect waves-light btn')
    let $aC = $('<a>').text('(click to view Glassdoor data)').attr('class', 'black-text')
    let $jobLocation = $('<td>').text(jobLocation)
    let $jobDate = $('<td>').text(jobDate)
    $tr = $('<tr>')
    let tBody = $('#jobTableBody')

    $tdT.append($jobTitle)
    // $tdT.append($Br1)
    // $tdT.append($aD)
    $tdT.append($open)
    // console.log($tdT);
    $tr.append($tdT)
    $tdC.append($jobCompany)
    // $tdC.append($Br2)
    // $tdC.append($aC)
    $tr.append($tdC)
    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)

    const $divJobFooter = $('<div>').attr('id', 'jobFooter')
    const $backButton = $('<a>').text('Back to Summary').attr('id', 'jobBackToJobs').attr('class', 'waves-effect waves-light btn')
    const $favoriteButton = $('<a>').addClass('favoriteButton').attr({'data-href': job.url, 'id': 'favoriteButton', class: 'waves-effect waves-light btn'}).text('Add to Favorites')
    const $divGlassDoor = $('#glassDoor')

    $divJobFooter.append($backButton)
    $.getJSON('/token')
      .done((loggedIn) => {
        if(loggedIn){
          $divJobFooter.append($favoriteButton)
        }
      })
      .fail((err) => {
        Materialize.toast(err.responseText, 3000);
      });
    jobsTable.append($divJobFooter)
    // jobsTable.append($divGlassDoor)

    $('#job').slideDown('slow')

    $("#jobBackToJobs").click(function(event) {
      event.preventDefault();

      $('#job').slideUp('slow')
      $('#jobs').slideDown('slow')
      $('#glassDoor').slideUp('slow')
      $('#searchForm').slideDown('slow')
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

            const $tableHeader = $('<thead>')
            const $th = $('<th>')
            const $h3 = $('<h5>').text('Company Summary')

            const $tbody = $('<tbody>')
            const $tr = $('<tr>')
            const $tr1 = $('<tr>')
            const $tr2 = $('<tr>')
            const $tr3 = $('<tr>')
            // const $tr4 = $('<tr>')
            // const $tr5 = $('<tr>')
            // const $tr6 = $('<tr>')
            // const $tr7 = $('<tr>')
            // const $tr8 = $('<tr>')
            // const $tr9 = $('<tr>')
            // const $tr10 = $('<tr>')

            $th.append($h3)
            $tableHeader.append($th)
            $table.append($tableHeader)


            const $img = $('<img>').attr({
              src: company.squareLogo,
              height: "120",
              width: "120"
              })
            const $tdL = $('<td rowspan="3">')
            $tdL.append($img)
            $tr1.append($tdL)

            const $aNC = $('<b>').text('Glassdoor Link: ')
            const $aN = $('<a>').text(company.name).attr('href', company.featuredReview.attributionURL).attr('target', '_blank')
            // const $bR = $('<br/>')
            const $tdN = $('<td>')
            $tdN.append($aNC)
            // $tdN.append($bR)
            $tdN.append($aN)
            $tr1.append($tdN)

            const $tdIS = $('<b>').text('Industry: ')
            const $tdIC = $('<span>').text('Industry: ' + company.industry)
            const $tdI = $('<td>')
            $tdI.append($tdIS)
            $tdI.append($tdIC)
            $tr1.append($tdI)
            $tbody.append($tr1)

            // *******************************************

            const $aW = $('<a>').text(company.website).attr('href', ('http://' + company.website)).attr('target', '_blank')
            const $tdW = $('<td>')
            $tdW.append($aW)
            $tr2.append($tdW)


            const $tdSB = $('<b>').text('Sector: ')
            const $tdSS = $('<span>').text(company.sectorName)
            const $tdS = $('<td>')
            $tdS.append($tdSB)
            $tdS.append($tdSS)
            $tr2.append($tdS)
            $tbody.append($tr2)

            // ******************************************


            const emptyTd = $('<td>')
            const $tdNORB = $('<b>').text('Number of Ratings: ')
            const $tdNORS = $('<span>').text(company.numberOfRatings)
            const $tdNOR = $('<td>')
            $tr3.append(emptyTd)
            $tdNOR.append($tdNORB)
            $tdNOR.append($tdNORS)
            $tr3.append($tdNOR)
            $tbody.append($tr3)

            $table.append($tbody)
            glassDoor.append($table)

            const $divGDR = $('<div>').attr({id: 'greenDoorRatings', class: 'col s4'})
            const $tableGDR = $('<table>').attr('class', 'striped')
            const $tableGDRHeader = $('<th>').text('Glassdoor Ratings')
            const $tableGDRBody = $('<tbody>').attr('id', 'tableGDR')
            $tableGDR.append($tableGDRHeader)
            $tableGDR.append($tableGDRBody)
            $divGDR.append($tableGDR)
            const $divFUR = $('<div>').attr({id: 'featuredUserReview', class: 'col s8'})
            const $tableFUR = $('<table>').attr('class', 'striped')
            const $tableFURHeader = $('<th>').text('Glassdoor Featured Review').attr('colspan', '2')  //<td colspan="2">
            const $tableFURBody = $('<tbody>').attr('id', 'tableFUR')
            $tableFUR.append($tableFURHeader)
            $tableFUR.append($tableFURBody)
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

            for (let i=0 ; i<greenDoorKeys.length ; i++) {
              const $row = $('<tr>')
              $row.append($('<td>').text(greenDoorKeys[i]))
              $row.append($('<td>').text(company[greenDoorVals[i]]))
              $tableGDRBody.append($row)
            }

            const companyReview = company.featuredReview

            const greenDoorFRKeys = [
              "Title:",
              "Overall Rating:",
              "Review Date:",
              "Reviewed By:",
              "Location:",
              // "Currently Employed at this company:",
              "Works here:",
              "Pro's:",
              "Con's:"
            ]

            const greenDoorFRVals = [
              "headline",
              "overall",
              "reviewDateTime",
              "jobTitle",
              "location",
              "currentJob",
              "pros",
              "cons"
            ]

            for (let i=0 ; i<greenDoorFRVals.length ; i++) {
              const $row = $('<tr>')
              $row.append($('<td>').text(greenDoorFRKeys[i]))
              // console.log(company.featuredReview);
              // console.log(companyReview[greenDoorFRVals[i]]);
              $row.append($('<td>').text(companyReview[greenDoorFRVals[i]]))
              $tableFURBody.append($row)
            }
          }
          renderCompany(company);
          $('#glassDoor').slideDown('slow')
        })
    })
  })
}

$('#job').click((event) => {
  if(event.target.attributes[1].value === 'favoriteButton'){
    var url = event.target.parentNode.parentNode.children[0].children[1].children[0].children[0].children[0].attributes[0].value

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({'url': url}),
          dataType: 'json',
          type: 'POST',
          url: '/favs/addJobInfo'
        };

        $.ajax(options)
          .done(() => {
            Materialize.toast('Successfully added to favorites', 3000);
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
  }
})

$('#tableBody').click((event) => {
  if (event.target.attributes[1].value === 'getJob'){
    var url = event.target.attributes[0].value;

    const options = {
            contentType: 'application/json',
            data: {'url': url},
            dataType: 'json',
            type: 'GET',
            url: '/dice/jobDesc'
          };


          $.ajax(options)
            .done((data) => {

            })
            .fail((err) => {
              Materialize.toast(err.responseText, 3000);
            });
  }
})
