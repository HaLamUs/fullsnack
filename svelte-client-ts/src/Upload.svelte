<script>
  import TableComponent from './TableComponent.svelte';
  import { fetchData } from './api';

  let file;
  let uploadProgress = 0; // Initialize progress to 0
  let isShow = false;
  let allContent = [];

  async function handleFileUpload() {
      if (file && file.type === 'text/csv') {
          // Simulate file upload progress (you'll replace this with actual logic)
          for (let i = 0; i <= 100; i += 10) {
              uploadProgress = i;
              await delay(200); // Simulate delay
          }
          
          const formData = new FormData();
          formData.append('file', file); // Append the file to the FormData

          try {
                const response = await fetch('http://localhost:8000/csv/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                  console.log('CSV file uploaded successfully:', file.name);
                  allContent = await fetchData(1, 10);
                  isShow = true
                } else {
                  console.error('Error uploading CSV:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading CSV:', error.message);
            }
      } else {
          console.error('Invalid file format. Please upload a CSV file.');
      }
  }

  // Simulate delay function
  function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

</script>

<input type="file" accept=".csv" on:change={e => (file = e.target.files[0])} />
<button on:click={handleFileUpload}>Upload CSV</button>

<!-- Display the loading bar -->
{#if uploadProgress > 0 && uploadProgress < 100}
  <progress value={uploadProgress} max="100"></progress>
{/if}

{#if isShow}
  <TableComponent {allContent} />
{/if}
