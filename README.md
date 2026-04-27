# Useless Facts App

A tiny, clean app that fetches and displays random useless facts from the Useless Facts API.

## Preview

<img width="840" height="1748" alt="screenshot 2026-04-27 at 13 57 34@2x" src="https://github.com/user-attachments/assets/b8ec1768-37b0-482b-9c01-98f0d3f94868" />

## Features

- **Display Random Facts**: Show facts in a clean card layout
- **Fetch New Facts**: Click a button to load and display a new random fact
- **Auto-load on Start**: Automatically fetch a fact when the app first opens

## How It Works

- Built with vanilla JavaScript, HTML, and CSS
- Uses the [Useless Facts API](https://uselessfacts.jsph.pl/) (no authentication required)
- Clean, minimal design with smooth animations

## Files

- `index.html` - HTML markup structure
- `styles.css` - Custom styling and animations
- `script.js` - JavaScript logic for fetching and displaying facts

## API Integration

The app fetches random facts from: `https://uselessFacts.jsph.pl/random.json?language=en`

Each fact includes:
- `id` - Unique identifier
- `text` - The useless fact
- `source` - Source name
- `source_url` - Link to the source
