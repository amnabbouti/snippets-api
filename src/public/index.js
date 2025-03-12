document.addEventListener('DOMContentLoaded', () => {
  const snippetsTable = document.getElementById('snippetsTable');
  const languageFilter = document.getElementById('languageFilter');
  const tagsFilter = document.getElementById('tagsFilter');
  const filterButton = document.getElementById('filterButton');
  const createSnippetForm = document.getElementById('createSnippetForm');
  const previousPageButton = document.getElementById('previousPage');
  const nextPageButton = document.getElementById('nextPage');
  const pageNumbersContainer = document.getElementById('pageNumbers');
  const itemsPerPage = 8;
  let currentPage = 1;
  let totalPages = 1;

  const API_BASE_URL = 'https://snippets-api-488735870354.us-central1.run.app';

  // Fetch snippets from server based on filters and pagination
  const fetchSnippets = async (filters = {}, page = 1) => {
    try {
      const query = new URLSearchParams({
        ...filters,
        page,
        limit: itemsPerPage,
      }).toString();
      const response = await fetch(`${API_BASE_URL}/api/snippets?${query}`);
      const data = await response.json();

      snippetsTable.innerHTML = '';
      if (data.availableLanguages) {
        languageFilter.innerHTML =
          '<option value="">Select a language</option>';
        data.availableLanguages.forEach(language => {
          const option = document.createElement('option');
          option.value = language;
          option.textContent =
            language.charAt(0).toUpperCase() + language.slice(1);
          languageFilter.appendChild(option);
        });
      }

      // Display snippets in the table
      data.snippets.forEach(snippet => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${snippet.title}</td>
          <td><pre>${snippet.code}</pre></td>
          <td>${snippet.language}</td>
          <td>${snippet.tags.join(', ')}</td>
          <td><button onclick="deleteSnippet('${snippet._id}')">Delete</button></td>
        `;
        snippetsTable.appendChild(row);
      });

      totalPages = data.pagination.totalPages;
      updatePaginationButtons();
    } catch (error) {
      console.error('Error fetching snippets:', error);
    }
  };

  // Update the pagination buttons
  const updatePaginationButtons = () => {
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
    pageNumbersContainer.innerHTML = `${currentPage} / ${totalPages}`;
  };

  // Handle page change
  const changePage = newPage => {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;
    fetchSnippets(
      {
        language: languageFilter.value,
        tags: tagsFilter.value.trim()
          ? tagsFilter.value.split(',').map(tag => tag.trim())
          : [],
      },
      currentPage,
    );
  };

  // Apply filters and fetch snippets
  const applyFilters = () => {
    const filters = {
      language: languageFilter.value,
      tags: tagsFilter.value.trim()
        ? tagsFilter.value.split(',').map(tag => tag.trim())
        : [],
    };
    currentPage = 1;
    fetchSnippets(filters, currentPage);
  };

  filterButton.addEventListener('click', applyFilters);
  previousPageButton.addEventListener('click', () =>
    changePage(currentPage - 1),
  );
  nextPageButton.addEventListener('click', () => changePage(currentPage + 1));

  // Handle form submission to create new snippet
  createSnippetForm.addEventListener('submit', async event => {
    event.preventDefault();
    const snippetData = {
      title: document.getElementById('title').value,
      code: document.getElementById('code').value,
      language: document.getElementById('language').value,
      tags: document
        .getElementById('tags')
        .value.split(',')
        .map(tag => tag.trim()),
      expiresIn: document.getElementById('expiresIn').value
        ? parseInt(document.getElementById('expiresIn').value)
        : undefined,
    };

    try {
      await fetch(`${API_BASE_URL}/api/snippets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippetData),
      });
      fetchSnippets();
      createSnippetForm.reset();
    } catch (error) {
      console.error('Error creating snippet:', error);
    }
  });

  fetchSnippets();
});
