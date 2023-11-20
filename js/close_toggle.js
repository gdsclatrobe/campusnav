// CLose for Search
function toggleContainer() {
    const mainContainer = document.getElementById('mainContainer');
    const mainSearchImage = document.getElementById('mainSearchImage');
    const closeButton = document.querySelector('.container1 .close');

    mainContainer.classList.toggle('hidden');
    mainSearchImage.classList.toggle('hidden');

    const imagePath = closeButton.classList.contains('active') ? 'img/search_main.png' : 'img/close.jpg';
    closeButton.src = imagePath;
}