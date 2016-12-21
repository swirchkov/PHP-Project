
function hideSearchlink() {
    document.getElementsByClassName('search-btn')[0].style.display = 'none';
}

function showSearchLink() {
    document.getElementsByClassName('search-btn')[0].style.display = 'inline-block';
}

hideSearchlink();

document.getElementsByClassName('search-query')[0].addEventListener('input', function(e) {

    if (e.srcElement.value.trim() !== "") { 
        showSearchLink();
    }
    else {
        hideSearchlink();
    }

});