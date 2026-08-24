// TrieNode represents one letter in the search tree.
// Each node can have child nodes for the next letters in a word.
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.suggestions = []; // Store matching video data at this point in the word
  }
}

// Trie stores words efficiently so we can search by prefix quickly.
// This is useful for autocomplete suggestions in the navbar search box.
export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.words = new Set();
  }

  // Insert a word into the trie.
  // data can be any related information, such as a video object.
  insert(word, data = null) {
    const normalizedWord = word.trim().toLowerCase();
    if (!normalizedWord || this.words.has(normalizedWord)) return;

    let node = this.root;
    this.words.add(normalizedWord);

    for (let char of normalizedWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
    if (data) {
      node.suggestions.push(data);
    }
  }

  // Search for all words that start with the given prefix.
  // For example: 'rea' would match 'React Tutorial for Beginners'.
  search(prefix, limit = 10) {
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();

    // Walk down the trie character by character until the prefix is reached.
    for (let char of lowerPrefix) {
      if (!node.children[char]) {
        return []; // No matching word starts with this prefix.
      }
      node = node.children[char];
    }

    // Collect all words below this prefix branch.
    const results = [];
    this._dfs(node, lowerPrefix, results, limit);
    return results;
  }

  // Depth-first traversal to gather all matching suggestions below the prefix.
  _dfs(node, currentWord, results, limit) {
    if (results.length >= limit) return;

    if (node.isEndOfWord && node.suggestions.length > 0) {
      results.push(...node.suggestions.slice(0, limit - results.length));
    }

    for (let char in node.children) {
      this._dfs(node.children[char], currentWord + char, results, limit);
    }
  }

  // Remove all data from the trie.
  clear() {
    this.root = new TrieNode();
    this.words.clear();
  }
}

// Sample video database used for autocomplete suggestions.
export const videosDatabase = fetch('http://localhost:5000/api/videos')
  .then((res) => res.json())
  .then((data) => data)
  .catch((err) => console.error('Fetch error:', err));

// Build the trie from the sample database so the navbar can search quickly.
export async function initializeTrie() {
  const response = await fetch('http://localhost:5000/api/videos');
  const videos = await response.json();

  const trie = new Trie();
  videos.forEach((video) => trie.insert(video.title, video));
  return trie;
}
