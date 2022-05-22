<script>
  export let onChange;
  export let suggestions;
  export let onSuggestionsSubmit;

  let searchInput;
  let cursorIndex = null;

  const onSearchInputKeyDown = (e) => {
    if (e.target.value?.trim() === '') {
      cursorIndex = null;
      onChange?.(null);
      return;
    }
    if (e.key === 'ArrowDown' && cursorIndex <= suggestions.length - 1) {
      cursorIndex === null || cursorIndex === suggestions.length - 1
        ? (cursorIndex = 0)
        : (cursorIndex += 1);
    } else if (e.key === 'ArrowUp' && cursorIndex !== null) {
      cursorIndex === 0 ? (cursorIndex = suggestions.length - 1) : (cursorIndex -= 1);
    } else if (e.key === 'Enter') {
      if (cursorIndex !== null) {
        onSuggestionsSubmit?.(suggestions[cursorIndex]);
        searchInput.value = suggestions[cursorIndex].name;
      }
    } else {
      onChange?.(e.target.value);
      return;
    }
  };

  const onSearchInputFocus = (e) => {
    if (e.target.value?.trim() !== '') {
      onChange?.(e.target.value);
    }
  };

  const onSearchInputFocusOut = (e) => {
    if (e.target.value?.trim() === '') {
      cursorIndex = null;
      onChange?.(null);
      return;
    }
  };

  const onClickSuggestion = (idx) => () => {
    onSuggestionsSubmit?.(suggestions[idx]);
    searchInput.value = suggestions[idx].name;
  };
  const onMouseoverSuggestion = (idx) => () => {
    cursorIndex = idx;
  };
</script>

<div class="root">
  <input
    type="text"
    placeholder="Search by name or station..."
    bind:this={searchInput}
    on:focus={onSearchInputFocus}
    on:focusout={onSearchInputFocusOut}
    on:blur={onSearchInputFocusOut}
    on:keydown={onSearchInputKeyDown}
  />

  {#if suggestions?.length}
    <div class="suggestions">
      {#each suggestions as suggestion, idx}
        <div
          class="suggestion"
          class:suggestion-highlighted={cursorIndex === idx}
          on:click={onClickSuggestion(idx)}
          on:mouseover={onMouseoverSuggestion(idx)}
          on:focus={onMouseoverSuggestion(idx)}
        >
          <div class="suggestion-top">{suggestion.name}</div>
          <div class="suggestion-bottom">{suggestion.stationName}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .root {
    position: relative;
  }

  input[type='text'] {
    width: 100%;
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    font-size: var(--size-1);
    border: 0;
  }

  input[type='text']:focus {
    outline: none;
  }

  .suggestions {
    position: absolute;
    width: 100%;
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-gray-2);
    border-left: 1px solid var(--color-gray-2);
    border-right: 1px solid var(--color-gray-2);
    border-bottom-left-radius: var(--spacing-1);
    border-bottom-right-radius: var(--spacing-1);
    z-index: 1;
    box-shadow: 0 3px 2px rgb(0 0 0 / 10%);
  }
  .suggestion {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
    border-top: 1px solid var(--color-gray-2);
  }
  .suggestion-top {
    font-size: var(--size-1);
  }
  .suggestion-bottom {
    font-size: var(--size-1);
    color: var(--color-gray-3);
  }
  .suggestion-highlighted {
    background-color: var(--color-gray-1);
  }
</style>
