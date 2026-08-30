// Queue follows the FIFO principle: first in, first out.
// This is useful for representing playback order in a playlist, where
// the earliest queued video is played before newer additions.
export class Queue {
  constructor(items = []) {
    this.items = [...items];
  }

  enqueue(item) {
    this.items.push(item);
    return this.items.length;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return [...this.items];
  }

  clone() {
    return new Queue(this.items);
  }

  static fromVideos(videos = []) {
    return new Queue(videos);
  }
}
