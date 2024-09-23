const grid = document.querySelector('.grid');
if(grid){
var iso= new Isotope(grid,{
    itemSelector:'.masonry-image',
    layoutMode:'masonry',
    percentPosition:true,
    masonry:{
        columnWidth:'.grid-sizer',
        gutter:12
    },
    getSortData:{
        date:'[data-published-date] parseInt'
    },
    filter: function() {
        var thisElement = this;
        var searchResult = qsRegex ? thisElement.dataset.name.match(qsRegex) : true;
        var buttonResult = mediaFilter ? thisElement.matches(mediaFilter) : true;
        var buttonResult2 = categoryFilter ? thisElement.matches(categoryFilter) : true;
        var checkboxResult = checkboxFilter ? thisElement.matches(checkboxFilter) : true;
        return searchResult && buttonResult && buttonResult2 && checkboxResult;
      }
    // transitionDuration:0
})
//To fix overlapping images when loading
imagesLoaded( grid ).on( 'progress', function() {
  // layout Isotope after each image loads
  iso.layout();
  AOS.init({
    once:true,
  })
});
}else{
  AOS.init({
    once:true,
  })
}

//Change the navbar color when scrolling down
window.addEventListener('scroll', function () {
  //Change the navbar color when scrolling down
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var screenWidth = window.innerWidth || document.documentElement.clientWidth;
      
      const navbar=this.document.querySelector('.navbar')
     if(screenWidth >=992){
      if (scrollPosition > 400 ) {
       navbar.classList.add('scroll-nav');
       navbar.classList.add('fixed');
       navbar.classList.add('fade-down');
       
      } else {
        navbar.classList.remove('scroll-nav');
        navbar.classList.remove('fade-down');
        navbar.classList.remove('fixed');
      }
     }
  
    });
  
    //Add a custom nav class for screens less than 992px
  function addClassIfLessThan992() {
      var screenWidth = window.innerWidth || document.documentElement.clientWidth;
      const navbar=this.document.querySelector('.navbar')
    
      if (screenWidth < 992) {
        navbar.classList.add('scroll-nav');
      
      } else {
        navbar.classList.remove('scroll-nav');     
      }
    } 
    // Call the function initially to set the class based on the screen width
     addClassIfLessThan992();
  // Listen for window resize events to update the class if needed
  window.addEventListener('resize', addClassIfLessThan992);
  
//Swiper popup slider
const popupSwiper=document.querySelector('.swiper.popup');
const gallerySwiper=document.querySelector('.swiper.swiper-gallery');
if(popupSwiper || gallerySwiper){
const swiper = new Swiper(popupSwiper, {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 100,
  // width:1000
  // slidesOffsetAfter:100,
  // slidesOffsetBefore:300
});

//Home page swiper 
const homeSwiper = new Swiper(gallerySwiper, {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  breakpoints:{
    320:{
      slidesPerView:1.1
    },
    576:{
      slidesPerView:2.1
    },
    767:{
      slidesPerView:3
    },
    992:{
      slidesPerView:3.5
    }
  },
  
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  
});
}
const mediaFilterBtns=document.querySelectorAll('.filter-type .btn')
var qsRegex;
var mediaFilter;
var categoryFilter;
var checkboxFilter;
//Apply filter
function filter() {
  iso.arrange();
}
// Add click event listener to each filter button
//add an active class to the media photo video filter btns and filter the content
mediaFilterBtns.forEach(function(button) {
    button.addEventListener('click', function(event) {
        mediaFilter = event.target.getAttribute('data-filter');
        // Remove active class from all buttons and add to the clicked button
        mediaFilterBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });
        this.classList.add('active');
      //Disable AOS in order not to make an animation conflict
       AOS.init({
        disable: true
      });
      if(grid){
      filter()
      }
    });
});

//add active class to the category btns
//Filter the items according to the selected filter
const categoryBtns=document.querySelectorAll('.category-types .btn')
categoryBtns.forEach(category=>{
    category.addEventListener('click',function(event){
        categoryFilter = event.target.getAttribute('data-filter');

        categoryBtns.forEach(category =>{
            category.classList.remove('active');
        })
        category.classList.add('active');
           //Disable AOS in order to not make any animation conflict
           AOS.init({
            disable: true
          });
          if(grid){
            filter()
          }
    })
})

const topicCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const allCheckbox=document.querySelector('.all-checkbox');
const filterdiv=document.querySelector('#form');
const filterGroup=filterdiv !== null ?filterdiv.getAttribute('data-filter-group'): null;
//get all checkboxes to apply filters
topicCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    //Uncheck the all checkbox if another checkbox is checked
      if (this !== allCheckbox && allCheckbox.checked) {
          allCheckbox.checked = false;
          //Uncheck all checkboxes if the all checkbox is checked
      } else if (this === allCheckbox && allCheckbox.checked) {
          topicCheckboxes.forEach(cb => {
              if (cb !== allCheckbox) {
                  cb.checked = false;
              }
          });
      }
      var filters = Array.from(document.querySelectorAll('input:checked')).map(function(elem) {
           return elem.value;
        });
        checkboxFilter = filters.join(', ');      
  
      AOS.init({
       disable: true
      });
      if(grid){
        filter();
      }
    
  });
 
});
const newsCards=document.querySelector('.news-events-cards')
const rows=document.querySelector('.table tbody')
//Clear all checkboxes checkings & category filter
const clearBtn=document.querySelector('.clear-all-button')
if(clearBtn){
clearBtn.addEventListener('click', function() {
     // Uncheck all checkboxes except for "All"
  document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    if (checkbox.value !== '*') {
      checkbox.checked = false;
    }
    allCheckbox.checked = true
  });
  const allCategoryBtn=document.querySelector('.filter-button-group2 [data-category="all"]');
  categoryBtns.forEach(category =>{
    category.classList.remove('active');
  })
  allCategoryBtn.classList.add('active');
  

  // Reset checkbox filter
  categoryFilter=allCategoryBtn.getAttribute('data-filter');
  checkboxFilter = null;
  if(grid){
    filter();
  }
  
  if(newsCards){
    
      document.querySelector('.filter-button-group2 button.active').click()
      allCheckbox.click()
      allCheckbox.checked = true
    
    console.log(mixer)
    document.querySelector('.news-and-events-section .sorting h3').textContent=mixer.getState().show.length + " Items";
  }
   if(rows){
    mixer.show()
 }
})
}
var dropdownItems = document.querySelectorAll('.dropdown-item');
var dropdownToggle = document.querySelector('.dropdown-toggle');
//set the selected sort-By dropdown text , sort and disable the selected one's and sort items by date
dropdownItems.forEach(function(item) {
  item.addEventListener('click', function() {

    if(this.classList.contains('disabled')){
        return;
    }
    // Disable the clicked item
    this.classList.add('disabled');

    // Update the dropdown toggle text
    dropdownToggle.textContent = this.textContent;
    // remove the disabled from all other items
    dropdownItems.forEach(function(otherItem) {
      if (otherItem !== item) {
        otherItem.classList.remove('disabled');
      }
    });
    const sortValue = item.getAttribute('data-sort');
    AOS.init({
        disable:true
    })
    if(grid){
    if(sortValue === 'desc'){
        iso.arrange({sortBy:'date',sortAscending:false})
    }else{
        iso.arrange({sortBy:'date',sortAscending:true}) 
    }  
  }
  });
});

//Change the style or the layout of the items
const layouts=document.querySelectorAll('.layout span')
layouts.forEach(layout=>{
    layout.addEventListener('click',function(){
       
        const dataLayout=this.dataset.layout;
        //add active for layout btns
        layouts.forEach(layout =>{
            layout.classList.remove('active');
        })
        layout.classList.add('active');
        //Change the layout of the items
        if(dataLayout === 'flex-layout'){
            iso.options.layoutMode="fitRows"
            document.querySelector('#grid').classList.add('flex')
        }else{
            iso.options.layoutMode="masonry"
            document.querySelector('#grid').classList.remove('flex')
        }
        AOS.init({
            disable:true
        })
        //fix the layout for the items 
        iso.layout();
    })
})

//Search bar filtering
var quicksearch = document.getElementById('searchbar');
if(quicksearch){
quicksearch.addEventListener('keyup', debounce(function() {
// In regular expressions, gi are flags that modify the behavior of the expression:
// g stands for "global" and is used to search for all occurrences of the pattern in the input string, not just the first one.
// i stands for "ignore case" and makes the pattern case-insensitive, so it will match both uppercase and lowercase letters.
  qsRegex = new RegExp(quicksearch.value, 'gi'); 
  AOS.init({
    disable:true
   })
   if(grid){
     filter();
   }
}, 200));
}

// Debounce function to make a delay in excution of searching
function debounce(fn, threshold) {
  var timeout;
  return function debounced() {
    if (timeout) {
      clearTimeout(timeout);
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout(delayed, threshold || 100);
  };
}
  
  var screenWidth = window.innerWidth || document.documentElement.clientWidth;
//get the filter btn and show the filter panel
const filterBtn= document.querySelectorAll('.filter');
if(filterBtn){
  filterBtn.forEach(filterbtn=>{
    filterbtn.addEventListener('click',()=>{
      filterbtn.classList.toggle('active')
      const filterPanel=document.querySelector('.filter-panel');
      filterPanel.classList.toggle('show');
  })
  })
}

//update the number of items whenever the filters are applied
const nbOfItems=document.querySelector('.nb-of-items h3');
const items = document.querySelectorAll('.masonry-image')
const popupSlider=document.querySelector('.popup-slider');
const popupCloseBtn=document.querySelector('.popup-slider .top-popup .close-button');

document.addEventListener('DOMContentLoaded', function() {
  if(items && nbOfItems){
    nbOfItems.innerHTML=`${items.length.toString()} Items` ;
    const allCheckboxLabel =allCheckbox.nextElementSibling;
    allCheckboxLabel.querySelector('span').innerHTML=`(${items.length.toString()})`;

    //add AOS-delay dynamically to the images
    items.forEach(function(img,i){
      img.setAttribute('data-aos-delay',i*50)
      //show and open the popup slider
      img.addEventListener('click',function(){
        popupSlider.classList.add('show');
        document.body.classList.add('no-scroll');
      })
    })
  }
  if(mixer){
  const nbofCards=mixer.getState().show.length;
  // const nbofCards=document.querySelectorAll('.news-and-events-section .card').length
  const title=document.querySelector('.news-and-events-section .sorting h3');
  if(title){
  title.textContent = nbofCards + ' Items';
  }
  // document.querySelector('.news-and-events-section .sorting h3').textContent = nbofCards + ' Items';
  }
});
//close the popup slider
if(popupCloseBtn){
popupCloseBtn.addEventListener('click',function(){
  popupSlider.classList.add('fade-out-popup');
  popupSlider.classList.remove('show');
  // document.body.classList.remove('no-scroll');
  setTimeout(function(){
    popupSlider.classList.remove('fade-out-popup');
  // popupSlider.classList.remove('show');
  document.body.classList.remove('no-scroll');
  },500)

})
}

const noItemFoundText=document.querySelector('.gallery-items .masonry-gallery .no-item');
if(grid){
iso.on('arrangeComplete', function(filteredItems) {
    nbOfItems.innerHTML=`${filteredItems.length} ${filteredItems.length > 1 ? ' Items' : '  Item'}`
    if(filteredItems.length === 0){
      noItemFoundText.style.display='block'
    }else{
      noItemFoundText.style.display='none'

    }
});
}

//Make the nb of items beside the checkbox dynamic according to its corresponding class in the images
const counts = {}
items.forEach(image =>{
const classNames=image.className.split(' ');
classNames.forEach(clas => { //clas => class (class is a reserved word)
  if (!counts[clas]) {
    counts[clas] = 0;
  }
  counts[clas]++;
});
})
//loop in counts "obj" to add the values(numbers) to each checkbox label
for (const clas in counts) {
  topicCheckboxes.forEach(checbox=>{
    const checkboxLabel=checbox.nextElementSibling;
    const labelValue=checkboxLabel.getAttribute('for');
    //If a checkbox has no corresponding topic in an image => set the nb 0 otherwise set it to its value
    if(!counts.hasOwnProperty(labelValue)){
      checkboxLabel.querySelector('span').innerHTML= "(0)";
    }else{
    checkboxLabel.querySelector('span').innerHTML= `(${counts[labelValue]})`
    }
  })
}
//Load more checkboxes when view more button is pressed
const viewMoreCheckboxes=document.getElementById('view-more');
if(viewMoreCheckboxes){
viewMoreCheckboxes.addEventListener('click',function () {
  const hiddenCheckboxes=document.querySelectorAll('.filter-option.hidden');
  hiddenCheckboxes.forEach(hiddenCheckbox=>{
    hiddenCheckbox.classList.remove('hidden')
    hiddenCheckbox.classList.add('fade-in');
  })
  this.classList.add('fade-out')
  setTimeout(function(){
    viewMoreCheckboxes.style.display='none';
    hiddenCheckboxes.forEach(hiddenCheckbox=>{
      hiddenCheckbox.classList.add('fade-in');
    })
  },500)
  })
}


//Embed  youtube videos when play button is clicked
const playBtns=document.querySelectorAll('.playbtn');
playBtns.forEach(playbtn => {
    playbtn.addEventListener('click',()=> {
        popupSlider.classList.add('show');
        document.body.classList.add('no-scroll');
        var iframe = document.createElement('iframe');
        var videoId=playbtn.getAttribute('data-video-id');
        const parentElement=playbtn.parentNode;
        const siblingElement = playbtn.previousElementSibling;
        const siblingHeight = siblingElement.offsetHeight;
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', siblingHeight);
        iframe.setAttribute('src','https://www.youtube.com/embed/'+ videoId + '?autoplay=1&mute=1');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('picture-in-picture', '');
        parentElement.innerHTML = '';
        parentElement.appendChild(iframe)
    })
})

//Share button copies the img src url
const reportShareBtns=document.querySelectorAll('li .action .share');
reportShareBtns.forEach(function (btn) { 
  btn.addEventListener('click',function(){
    var parentSibling=this.parentNode.previousElementSibling ;//Get to the card parent
    const text=parentSibling.textContent;
    const separatedText = text.split(' ').join('-');
    const modalUrl=document.querySelector('.link .link-url');
    modalUrl.innerHTML=`'${window.location.href}/${separatedText}`;
  })
 })

 //Share button in Home page.html
const shareBtns=document.querySelectorAll('.card .action .share');
shareBtns.forEach(function (btn) { 
  btn.addEventListener('click',function(){
    // var parent=this.parentNode.parentNode.parentNode;//Get to the card parent
    const slide = btn.closest('.swiper-slide'); // Find the closest swiper-slide container
    const image = slide.querySelector('img'); // Find the image within the swiper-slide
    const imgUrl=image ? image.src : null;
    // const imgUrl=parent.querySelector('img').src;
    const modalUrl=document.querySelector('.link .link-url');
    modalUrl.innerHTML=imgUrl;

  })
 })
  //Share button in newsDetails.html
const shareBtn=document.querySelectorAll('.news-details .card .action .share');
shareBtn.forEach(function (btn) { 
  btn.addEventListener('click',function(){
    const imgElement=document.querySelector('.card-img');
    const imgUrl=imgElement ? imgElement.src : null;
    // const imgUrl=document.querySelector('.card-img').src
    const modalUrl=document.querySelector('.link .link-url');
    modalUrl.innerHTML=imgUrl;

  })
 })

   //Share button in Report-Insights.html
const tableshareBtn=document.querySelectorAll('.table .card .action .share');
tableshareBtn.forEach(function (btn) { 
  btn.addEventListener('click',function(){
    const parentRow = this.closest('tr');
    // Find the file name in the same row
    const fileName = parentRow.querySelector('th').textContent;
    // Print the file name (here, we're just logging it to the console)
    const modalUrl=document.querySelector('.link .link-url');
    modalUrl.innerHTML=fileName;

  })
 })


//Copy the link of the page
const copyBtn=document.querySelector('.copy-btn');
if(copyBtn){
copyBtn.addEventListener('click',function(){
  const url=document.querySelector('.link .link-url').innerHTML.trim().replace(/\s+|\n+/g, '');
  navigator.clipboard.writeText(url)
  copyBtn.innerHTML= "Copied";
  setTimeout(function(){
    copyBtn.innerHTML="Copy";
  },2000)
})
}

//Share the link or image to social media platforms
    const shareTwitterBtn = document.querySelector('.share-twitter');
    const shareFacebookBtn = document.querySelector('.share-facebook');
    // const shareInstagramBtn= document.querySelector('.share-instagram');
    const shareLinkedinBtn = document.querySelector('.share-linkedin');
  
   // Share on Twitter
   if(shareFacebookBtn || shareLinkedinBtn || shareTwitterBtn){
shareTwitterBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // const url = encodeURIComponent(window.location.href);
    // const url = encodeURIComponent(window.location.href);
    const url=document.querySelector('.link .link-url').innerHTML;
    const text = encodeURIComponent('Check out this photo!');
    const imageUrl = encodeURIComponent('https://static.vecteezy.com/system/resources/thumbnails/025/284/015/small_2x/close-up-growing-beautiful-forest-in-glass-ball-and-flying-butterflies-in-nature-outdoors-spring-season-concept-generative-ai-photo.jpg'); // Replace with the actual URL of your image
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}&media=${imageUrl}`, '_blank');
  });
  
  // Share on Facebook
  shareFacebookBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // const url = encodeURIComponent('https://creative-lollipop-f36a4c.netlify.app');
    const url=document.querySelector('.link .link-url').innerHTML;
    const imageUrl = encodeURIComponent('https://example.com/path/to/image.jpg'); // Replace with the actual URL of your image
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  });
  
  // Share on LinkedIn
  shareLinkedinBtn.addEventListener('click', function(event) {
    event.preventDefault();
    //const url = encodeURIComponent(window.location.href);
    // const url = encodeURIComponent('https://creative-lollipop-f36a4c.netlify.app');
    const url=document.querySelector('.link .link-url').innerHTML;
    const title = encodeURIComponent('Check out this photo!');
    const summary = encodeURIComponent('Description of the photo.');
    const imageUrl = encodeURIComponent('https://example.com/path/to/image.jpg'); // Replace with the actual URL of your image
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  });
}
////* Press release page //////
const loadmoreBtn=document.querySelector('.load-more-button');
if(loadmoreBtn){
loadmoreBtn.addEventListener('click',function(){
  const cards =document.querySelectorAll('.news-events-cards .card.hidden');
  cards.forEach(card =>{
    // card.removeAttribute('hidden');
    card.classList.remove('hidden')
    card.classList.add('fade-in');
   
  })
     mixer.forceRefresh();
     document.querySelector('.filter-button-group1 button.active').click();
    // const nbOfItems= mixer.getState().totalShow
    // console.log(nbOfItems)
    // document.querySelector('.news-and-events-section .sorting h3').textContent=nbOfItems > 1 ? `${nbOfItems} Items` : `${nbOfItems} Item`; 
  loadmoreBtn.style.display="none";
})
}
const mixerNbOfItems=document.querySelector('.news-and-events-section .sorting h3');
//filter for the all news page
if(newsCards){
  var mixer= mixitup(newsCards,{
    selectors:{
      target:'.card:not(.hidden)',
    },
      animation: {
        queueLimit: 5
    },
    multifilter:{
      enable:true
    },
    load:{
      filter:'.news'
    },
    callbacks: {
      onMixStart: function(state, futureState) {
          console.log(futureState.activeFilter.selector);
      },
      onMixEnd:function (state) { 
        const nbOfItems=state.totalShow
        mixerNbOfItems.textContent=nbOfItems > 1 ? `${nbOfItems} Items` : `${nbOfItems} Item`;
       },
       onMixClick:function (state) {
        console.log(state)
         }
    }
    
  })
}
//table filtering for the reports-insights-page
if(rows){
  var mixer= mixitup(rows,{
    selectors:{
      target:'tr',
    },
    multifilter:{
      enable:true
    },
    callbacks: {
      onMixStart: function(state, futureState) {
          console.log(futureState.activeFilter.selector);
      }
    }
    
  })
}
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('click', function() {
    const target = this.getAttribute('data-target');
    const sidepanel = document.querySelector('.side-social-panel');
    const iframes = document.querySelectorAll('.side-social-panel .panel > div');
    document.querySelector('.overlay-bg').classList.add('show');
    document.body.classList.add('no-scroll');
    sidepanel.classList.add('show');
    // Hide all iframes
    iframes.forEach(iframe => {
      iframe.style.display = 'none';
    });

    // Show the selected iframe
    const targetIframe = document.getElementById(target);
    if (targetIframe) {
      targetIframe.style.display = 'block';
    }else{
      targetIframe.style.display = 'none';
    }
  });
});
const closeBtn = document.querySelector('.side-social-panel .close-btn');
if(closeBtn){
closeBtn.addEventListener('click',function(){
  const sidepanel = document.querySelector('.side-social-panel');
  sidepanel.classList.remove('show');
  document.querySelector('.overlay-bg').classList.remove('show');
  document.body.classList.remove('no-scroll');
})
}




