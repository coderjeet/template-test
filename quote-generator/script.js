const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const apiUrl = 'https://type.fit/api/quotes';
const loader = document.getElementById('loader');

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quote from API
async function getQuote() {
  loading();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const var1 = Math.floor(Math.random() * 1600);
    quoteText.innerText = data[var1].text;
    // If Author is blank, add 'Unknown'
    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data[var1].author;
    }
    // Reduce font size for long quotes
    if (data[var1].text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    // STop Loader, Show Quote
    complete();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listners
newQuote.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
