import { KBarButton } from 'pliny/search/KBarButton'
import { SearchProvider } from 'pliny/search'

function SearchButton() {
  return (
    <SearchProvider
      searchConfig={{
        provider: 'kbar',
        kbarConfig: { searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json` },
      }}
    >
      <KBarButton aria-label="Search">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-gray-950/2 px-2 py-1 inset-ring inset-ring-gray-950/8 dark:bg-white/5 dark:inset-ring-white/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="-ml-0.5 size-4 fill-gray-600 dark:fill-gray-500"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <kbd className="typo-body4 block font-sans text-gray-500 dark:text-gray-400">⌘K</kbd>
        </button>
      </KBarButton>
    </SearchProvider>
  )
}

export default SearchButton
