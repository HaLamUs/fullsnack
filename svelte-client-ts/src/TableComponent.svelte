<!-- TableComponent.svelte -->
<style>
  /* Basic table styling */
  table {
      width: 100%;
      border-collapse: collapse;
      font-family: Arial, sans-serif;
  }

  th, td {
      padding: 10px;
      border: 1px solid #ddd;
  }

  th {
      background-color: #f5f5f5;
      font-weight: bold;
  }

  tr:nth-child(even) {
      background-color: #f9f9f9;
  }
</style>

<!-- Search input -->
<div>
  <input type="text" placeholder="Search..." on:input={handleSearchInput} />
  <button on:click={() => currentPage = 1}>Search</button>
</div>


<table>
  <thead>
      <tr>
          <th>Post ID</th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
      </tr>
  </thead>
  <tbody>
      {#each allContent.data as item}
          <tr>
              <td>{item.postId}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
          </tr>
      {/each}
  </tbody>
</table>

<!-- Pagination controls -->
<div>
  <button on:click={prevPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {totalPages}</span>
  <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
</div>

<script>
  import { fetchData, searchData } from './api';
  export let allContent;
  let currentPage = Number(allContent.currentPage);
  let itemsPerPage = Number(allContent.itemsPerPage);
  let totalItems = allContent.totalItems;
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  // let currentPageRows = [];
  let searchTerm = ''; // Initialize search term

  // Function to handle next page request
  async function nextPage() {
      if (currentPage < totalPages) {
          currentPage += 1;
          allContent = await fetchData(currentPage, 10);
          console.log(`next page`, allContent);
      }
  }

  // Function to handle previous page request
  async function prevPage() {
      if (currentPage > 1) {
          currentPage -= 1;
          allContent = await fetchData(currentPage, 10);
      }
  }

  // Function to handle search input
  async function handleSearchInput(event) {
    
    searchTerm = event.target.value;
    allContent = await searchData(searchTerm);
    // console.log(`handleSearchInput`, searchTerm)
    // console.log(`allContent`, allContent)
    currentPage = 1
    itemsPerPage = 10
    totalItems = allContent.totalItems;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    }
  
</script>
