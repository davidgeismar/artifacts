export const searchBar = `<div id="searchbar" class='hide'>
                            <input type="text" placeholder="Search an artist" id="search-input">
                            <div class="search" id='close-search'></div>
                            <div class="main-content" id='main'>
                              <div class="portfolio" id="search-results">
                              </div>
                            </div>
                          </div>`

export class SearchBar {
  render() {
    return (
      `<div id="searchbar" class='hide'>
        <input type="text" placeholder="Search an artist" id="search-input">
        <div class="search" id='close-search'></div>
        <div class="main-content" id='main'>
          <div class="portfolio" id="search-results">
          </div>
        </div>
      </div>`
    )
  }
}
