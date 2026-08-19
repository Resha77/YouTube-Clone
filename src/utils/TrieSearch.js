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
  }

  // Insert a word into the trie.
  // data can be any related information, such as a video object.
  insert(word, data = null) {
    let node = this.root;
    const lowerWord = word.toLowerCase();

    for (let char of lowerWord) {
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
  }
}

// Sample video database used for autocomplete suggestions.
export const videosDatabase = [
  { id: 1, title: 'React Tutorial for Beginners', channel: 'Tech Academy' },
  { id: 2, title: 'React Hooks Deep Dive', channel: 'Dev Masters' },
  { id: 3, title: 'React Context API Explained', channel: 'Code School' },
  { id: 4, title: 'Vite.js Setup and Configuration', channel: 'Frontend Pro' },
  { id: 5, title: 'Vue.js vs React Comparison', channel: 'Web Dev Today' },
  { id: 6, title: 'JavaScript Fundamentals', channel: 'Programming Hub' },
  { id: 7, title: 'CSS Flexbox Mastery', channel: 'Style Guide' },
  { id: 8, title: 'Node.js Express Server', channel: 'Backend Masters' },
];

// Build the trie from the sample database so the navbar can search quickly.
export function initializeTrie() {
  const trie = new Trie();
  videosDatabase.forEach(video => {
    trie.insert(video.title, video);
  });
  return trie;
}
