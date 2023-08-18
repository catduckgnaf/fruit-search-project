const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
  
	for (let i = 0; i < fruit.length; i++) {
	  const fruitName = fruit[i];
	  if (fruitName.toLowerCase().includes(str.toLowerCase())) {
		results.push(fruitName);
	  }
	}
  
	return results;
  }
  
  function searchHandler(e) {
	const inputVal = e.target.value;
	if (inputVal.length === 0) {
	  suggestions.classList.remove('has-suggestions');
	} else {
	  const results = search(inputVal);
	  showSuggestions(results);
	}
  }
  
  function showSuggestions(results) {
	suggestions.innerHTML = '';
	results.forEach(result => {
	  const li = document.createElement('li');
	  li.textContent = result;
	  suggestions.appendChild(li);
	});
	suggestions.classList.add('has-suggestions');
  }
  
  let highlightedIndex = -1;

  function highlightSuggestion(index) {
	removeHighlight();
	if (index >= 0 && index < suggestions.children.length) {
	  suggestions.children[index].classList.add('highlighted');
	  highlightedIndex = index;
	}
  }
  
  function removeHighlight() {
	if (highlightedIndex !== -1) {
	  suggestions.children[highlightedIndex].classList.remove('highlighted');
	  highlightedIndex = -1;
	}
  }
  
  function useSuggestion(e) {
	if (e.target.tagName === 'LI') {
	  input.value = e.target.textContent;
	  suggestions.innerHTML = '';
	  suggestions.classList.remove('has-suggestions');
	  input.placeholder = input.value; // Update the placeholder with the selected suggestion
	}
  }
  
  input.addEventListener('input', searchHandler);
  suggestions.addEventListener('click', useSuggestion);
  
  input.addEventListener('keydown', e => {
	if (e.key === 'ArrowDown') {
	  e.preventDefault();
	  if (highlightedIndex < suggestions.children.length - 1) {
		highlightSuggestion(highlightedIndex + 1);
	  }
	} else if (e.key === 'ArrowUp') {
	  e.preventDefault();
	  if (highlightedIndex > 0) {
		highlightSuggestion(highlightedIndex - 1);
	  }
	} else if (e.key === 'Enter') {
	  if (highlightedIndex !== -1) {
		e.preventDefault();
		input.value = suggestions.children[highlightedIndex].textContent;
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
		input.placeholder = input.value; // Update the placeholder with the selected suggestion
	  }
	}
  });
  

  function useSuggestion(e) {
	if (e.target.tagName === 'LI') {
	  input.value = e.target.textContent;
	  suggestions.innerHTML = '';
	  suggestions.classList.remove('has-suggestions');
	  input.placeholder = input.value; 
	}
  }
  
  input.addEventListener('input', searchHandler);
  suggestions.addEventListener('click', useSuggestion);
  
  input.addEventListener('focus', () => {
	if (suggestions.children.length > 0) {
	  suggestions.classList.add('has-suggestions');
	}
  });
  
  input.addEventListener('blur', () => {
	suggestions.classList.remove('has-suggestions');
  });
  
  // Add random color on hover
  suggestions.addEventListener('mouseover', (e) => {
	if (e.target.tagName === 'LI') {
	  const randomColor = generateRandomColor();
	  e.target.style.backgroundColor = randomColor;
	}
  });
  
  suggestions.addEventListener('mouseout', (e) => {
	if (e.target.tagName === 'LI') {
	  e.target.style.backgroundColor = '';
	}
  });
  
  function generateRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }