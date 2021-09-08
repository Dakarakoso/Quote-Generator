const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const newQuote = () => {
  showLoadingSpinner();
  // pick random quote from api quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //   check if author is null, if so replace it
  if (!quote.author) {
    authorText, (textContent = "UNKNOWN");
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length, if it is long change styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   set quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

//  get quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    if (error) {
      quoteText.textContent = "Ops! Something went wrong! Try again later";
      authorText.textContent = error;
    }
  }
};

// Tweet quote function
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuotes();
